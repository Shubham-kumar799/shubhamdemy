const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { hashPassword, comparePassword } = require("../utils/auth");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body.user;

    // Validation
    if (!username) return res.status(400).send("Name is required");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    // hash password
    const hashedPassword = await hashPassword(password);

    // register
    const user = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).json({ success: true });
  } catch (err) {
    console.log("error registering user", err);
    return res.status(400).send("Error, Try again");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body.user;

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Invalid credentials");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res.cookie("token", token, {
      httpOnly: true, //token cannot be accesed from client side javascript
      secure: true, //this setting only works on https
      expires: new Date(Date.now() + 7 * 24 * 3600000), //7 days
    });

    res.status(200).json(user);
  } catch (err) {
    console.log("Error logging in", err);
    res.status(400).send("Error. Try again.");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout succesfull" });
  } catch (err) {
    console.log("logout err", err);
    return res.status(400).json({ message: "Error, Try again" });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) return res.status(200).json({ ok: true });
  } catch (error) {
    console.log("current user error", error);
    return res.status(401).json({ ok: false });
  }
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
};
