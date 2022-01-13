const express = require('express');
// CONTROLLERS
const {
  makeInstructor,
  getAccountStatus,
  currentInstructor,
  instructorCourses,
} = require('../controllers/instructor');

// MIDDLEWARES
const { requireSignin } = require('../middlewares/index');

const router = express.Router();

router.get('/current-instructor', requireSignin, currentInstructor);
router.get('/instructor-courses', requireSignin, instructorCourses);
//DOES NOT WORK CURRENTLY (STRIPE ISSUE)
router.post('/make-instructor', requireSignin, makeInstructor);
router.post('/get-account-status', requireSignin, getAccountStatus);

module.exports = router;
