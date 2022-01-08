const express = require('express');
// CONTROLLERS
const {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  verifyOtp,
} = require('../controllers/auth');

// MIDDLEWARES
const { requireSignin } = require('../middlewares/index');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/current-user', requireSignin, currentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-otp', verifyOtp);

module.exports = router;
