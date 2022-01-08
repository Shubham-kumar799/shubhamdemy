const express = require('express');
// CONTROLLERS
const { makeInstructor } = require('../controllers/instructor');

// MIDDLEWARES
const { requireSignin, getAccountStatus } = require('../middlewares/index');

const router = express.Router();

router.post('/make-instructor', requireSignin, makeInstructor);
router.post('/get-account-status', requireSignin, getAccountStatus);

module.exports = router;
