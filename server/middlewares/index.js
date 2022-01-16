const User = require('../models/user');
const expressJwt = require('express-jwt');
const Course = require('../models/course');

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

const isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log('req', req.params);
    const course = await Course.findOne({ slug: req.params.slug });
    let ids = [];
    let length = user.courses && user.courses.length;
    for (let i = 0; i < length; i++) {
      ids.push(user.courses[i].toString());
    }

    if (!ids.includes(course?._id.toString())) {
      res.status(403);
      console.log('Not in next');
    } else {
      next();
    }
  } catch (err) {
    console.log('Error in isEnrolled', err);
    res.status(500);
  }
};

module.exports = {
  requireSignin,
  isInstructor,
  isEnrolled,
};
