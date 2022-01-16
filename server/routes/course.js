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
  publishCourse,
  takeDownCourse,
  courses,
  checkEnrollment,
  freeEnrollment,
  userCourses,
  markCompleted,
  listCompleted,
  markIncomplete,
} = require('../controllers/course');

// MIDDLEWARES
const {
  requireSignin,
  isInstructor,
  isEnrolled,
} = require('../middlewares/index');

const router = express.Router();

//image
router.post('/course/upload-image', uploadImage);
router.post('/course/remove-image', removeImage);

//course
router.get('/courses', courses);
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
router.get('/check-enrollment/:courseId', requireSignin, checkEnrollment);

//publish and unpublish
router.put('/course/publish/:courseId', requireSignin, publishCourse);
router.put('/course/unpublish/:courseId', requireSignin, takeDownCourse);

//lesson
router.post('/course/lesson/:slug/:instructorId', requireSignin, addLesson);
router.put('/course/lesson/:slug/:instructorId', requireSignin, updateLesson);
router.put('/course/:slug/:lessonId', requireSignin, removeLesson);

//enrollment
router.post('/free-enrollment/:courseId', requireSignin, freeEnrollment);

//user-courses
router.get('/user-courses', requireSignin, userCourses);
router.get('/user/course/:slug', requireSignin, isEnrolled, read);

//mark-completed
router.post('/mark-completed', requireSignin, markCompleted);
router.post('/mark-incomplete', requireSignin, markIncomplete);
router.post('/list-completed', requireSignin, listCompleted);

module.exports = router;
