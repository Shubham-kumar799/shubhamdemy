const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { nanoid } = require('nanoid');
const { hashPassword, comparePassword } = require('../utils/auth');
const AWS = require('aws-sdk');

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //searching for user
    let userExist = await User.findOne({ email }).exec();
    if (userExist)
      return res
        .status(400)
        .json({ message: 'Email is already in use', ok: false });

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const user = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    user.password = undefined;

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true, //token cannot be accesed from client side javascript
      // secure: true, //this setting only works on https
      expires: new Date(Date.now() + 7 * 24 * 3600000), //7 days
    });

    res.status(201).json({ ok: true, user });
  } catch (err) {
    console.log('error registering user', err);
    return res.status(400).json({ ok: false, message: 'Error. Try Again' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user)
      return res.status(400).json({ ok: false, message: 'No user found' });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ ok: false, message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    user.password = undefined;
    res.cookie('token', token, {
      httpOnly: true, //token cannot be accesed from client side javascript
      // secure: true, //this setting only works on https
      expires: new Date(Date.now() + 7 * 24 * 3600000), //7 days
    });

    res.status(200).json({ ok: true, user });
  } catch (err) {
    console.log('Error logging in', err);
    res.status(400).json({ ok: false, message: 'Error. Try Again' });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ ok: true, message: 'Logout Successful' });
  } catch (err) {
    console.log('logout err', err);
    return res.status(400).json({ ok: false, message: 'Error, Try again' });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) return res.status(200).json({ ok: true });
  } catch (error) {
    console.log('current user error', error);
    return res.status(401).json({ ok: false });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const shortCode = nanoid(6).toUpperCase();
    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode }
    );

    if (!user) return res.status(400).json({ message: 'User Not Found' });

    //params for email
    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <html>
                <h1>Reset Password</h1>
                <p>Your OTP to reset your password is:</p>
                <h2 style="color: red;">${shortCode}</h2>
                <i>From ShubhamDemy</i>
              </html>
              `,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Reset Password',
        },
      },
    };

    const emailSent = SES.sendEmail(params).promise();
    emailSent
      .then(data => {
        res.json({ ok: true });
      })
      .catch(err => {
        console.log('error sending email', err);
      });
  } catch (error) {
    res.status(400).json({ message: 'Error. Try Again!' });
    console.log('error in forgot password', error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashedPassword = await hashPassword(newPassword);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );
    if (!user) return res.status(400).json({ message: 'User Not Found' });
    res.status(201).json({ ok: true });
  } catch (error) {
    console.log('error Reset password', error);
    res.status(400).json({ message: 'Error. Try Again!' });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, Otp } = req.body;
    const user = await User.findOneAndUpdate(
      {
        email,
        passwordResetCode: Otp,
      },
      {
        passwordResetCode: '',
      }
    );
    if (!user) return res.status(400).json({ message: 'OTP does not match' });
    res.status(201).json({ ok: true });
  } catch (error) {
    console.log('error verifyOtp', error);
    res.status(400).json({ message: 'Error. Try Again!' });
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  verifyOtp,
};
