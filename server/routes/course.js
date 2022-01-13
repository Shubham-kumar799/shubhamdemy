const express = require('express');
const formidable = require('express-formidable');
// CONTROLLERS
const {
  uploadImage,
  removeImage,
  create,
  read,
  uploadVideo,
  removeVideo,
  addLesson,
  update,
  removeLesson,
  updateLesson,
} = require('../controllers/course');

// MIDDLEWARES
const { requireSignin, isInstructor } = require('../middlewares/index');

const router = express.Router();

//image
router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);

//course
router.post('/course', requireSignin, isInstructor, create);
router.put('/course/:slug', requireSignin, update);
router.get('/course/:slug', read);
router.post(
  '/course/video-upload/:instructorId',
  requireSignin,
  formidable(),
  uploadVideo
);
router.post('/course/remove-video/:instructorId', requireSignin, removeVideo);
//lesson
router.post('/course/lesson/:slug/:instructorId', requireSignin, addLesson);
router.put('/course/lesson/:slug/:instructorId', requireSignin, updateLesson);
router.put('/course/:slug/:lessonId', requireSignin, removeLesson);

module.exports = router;
