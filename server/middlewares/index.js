const User = require('../models/user');
const expressJwt = require('express-jwt');

const requireSignin = expressJwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

const isInstructor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.role.includes('Instructor')) {
      return res.status(403).json({ message: 'Access Denied' });
    }
    next();
  } catch (err) {
    console.log('error in isInstructor middleware', err);
    res.status(500).json({ message: 'Error. Try Again' });
  }
};

module.exports = {
  requireSignin,
  isInstructor,
};
