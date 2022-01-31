const AWS = require('aws-sdk');
const { nanoid } = require('nanoid');
const Course = require('../models/course');
const slugify = require('slugify');
const { readFileSync } = require('fs');
const User = require('../models/user');
const Completed = require('../models/completed');

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send({ message: 'No image found' });

    //prepare the image
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    const type = 'jpeg';
    //image params
    const params = {
      Bucket: 'shubhamdemy-bucket',
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,
    };

    S3.upload(params, (err, data) => {
      if (err) {
        console.log('err in S3', err);
        return res
          .status(500)
          .json({ message: 'Image upload failed. Try Again' });
      }
      return res.send(data);
    });
  } catch (error) {
    console.log('error image', error);
    res.status(400).json({ message: 'Error. Try Again' });
  }
};

const removeImage = async (req, res) => {
  try {
    const { image } = req.body;
    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('error in S3 remove image', err);
        res.status(400).json({ message: 'Error deleting image. Try Again' });
      }
      res.send({ ok: true });
    });
  } catch (err) {
    console.log('error removing image', err);
    res.status(400).json({ message: 'Error. Try Again' });
  }
};

const create = async (req, res) => {
  try {
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.title.toLowerCase()),
    });
    if (alreadyExist) {
      return res
        .status(400)
        .json({ message: 'Name is taken. Try another name.' });
    }

    const course = await new Course({
      slug: slugify(req.body.title),
      instructor: req.user._id,
      ...req.body,
    }).save();

    res.status(201).json({ message: 'Course Uploaded Successfully' });
  } catch (err) {
    console.log('error creating course', err);
    res.status(500).json({ msg: 'Error. Try Again.' });
  }
};

const read = async (req, res) => {
  try {
    let course = await Course.findOne({ slug: req.params.slug }).populate(
      'instructor',
      '_id username'
    );

    res.json(course);
  } catch (error) {
    console.log('error reading course', error);
    res.status(500).json({ message: 'Error. Try Again' });
  }
};

const uploadVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { video } = req.files;

    if (!video)
      return res.status(400).json({ message: 'No video received. Try Again' });

    //video params
    const params = {
      Bucket: 'shubhamdemy-bucket',
      Key: `${nanoid()}.${video.type.split('/')[1]}`,
      Body: readFileSync(video.path),
      ACL: 'public-read',
      ContentType: video.type,
    };

    //Upload to S3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log('error uploading video to S3', err);
        return res.status(400).json({ message: 'Error . Try Again' });
      }

      res.status(200).send(data);
    });
  } catch (err) {
    console.log('error in upload video', err);
    res.status(400).json({ message: 'Error. Try Again ' });
  }
};

const removeVideo = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { Bucket, Key } = req.body;

    if (!Bucket || !Key)
      return res.status(400).json({ message: 'No video received. Try Again' });

    //video params
    const params = {
      Bucket,
      Key,
    };

    //remove from S3
    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log('error deleting video from S3', err);
        return res
          .status(400)
          .json({ message: 'Error deleting video. Try Again' });
      }

      res.status(200).json({ ok: true });
    });
  } catch (err) {
    console.log('error in deleting video', err);
    res.status(400).json({ message: 'Error deleting video. Try Again' });
  }
};

const addLesson = async (req, res) => {
  try {
    if (req.user._id != req.params.instructorId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { slug, instructorId } = req.params;
    const { title, content, video, free_preview } = req.body;

    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: {
          lessons: {
            title,
            content,
            video,
            slug: slugify(title),
            free_preview,
          },
        },
      },
      {
        new: true,
      }
    )
      .populate('instructor', '_id username')
      .exec();
    res.json(updated);
  } catch (err) {
    console.log('Error adding course', err);
    res.status(400).json({ message: 'Error. Try Again!' });
  }
};

const update = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await Course.findOne({ slug });
    if (course.instructor != req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const updated = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true,
    }).exec();
    res.json(updated);
  } catch (err) {
    console.log('Error Updating course', err);
    res.status(400).json({ message: 'Error. Try Again!' });
  }
};

const removeLesson = async (req, res) => {
  try {
    const { slug, lessonId } = req.params;
    const course = await Course.findOne({ slug });
    if (course.instructor != req.user._id) {
      return res.status(401).json({ ok: false, message: 'Unauthorized' });
    }

    const updated = await Course.findByIdAndUpdate(
      course._id,
      {
        $pull: { lessons: { _id: lessonId } },
      },
      { new: true }
    );
    res.json({ ok: true, message: updated });
  } catch (err) {
    console.log('Error deleting lesson', err);
    res.status(400).json({ ok: false, message: 'Error. Try Again!' });
  }
};

const updateLesson = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await Course.findOne({ slug }).select('instructor');

    if (course.instructor != req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { _id, content, title, video, free_preview } = req.body;

    const updated = await Course.updateOne(
      { 'lessons._id': _id },
      {
        $set: {
          'lessons.$.title': title,
          'lessons.$.content': content,
          'lessons.$.video': video,
          'lessons.$.free_preview': free_preview,
        },
      },
      {
        new: true,
      }
    );
    res.json({ ok: true });
  } catch (err) {
    console.log('Error updating lesson', err);
    res.status(400).json({ message: 'Error. Try Again!' });
  }
};

const publishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select('instructor').exec();
    if (course.instructor._id != req.user._id) {
      res.status(401).json({ msg: 'Unauthorized' });
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: true },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.log('error publish course', err);
    res.status(400).json({ msg: 'Error publishing course. Try Again' });
  }
};

const takeDownCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).select('instructor').exec();

    if (course.instructor._id != req.user._id) {
      res.status(401).json({ msg: 'Unauthorized' });
    }

    const updated = await Course.findByIdAndUpdate(
      courseId,
      { published: false },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    console.log('error publish course', err);
    res.status(400).json({ msg: 'Error unpublishing your course. Try Again' });
  }
};

const courses = async (req, res) => {
  try {
    const all = await Course.find({ published: true })
      .select('-lessons')
      .populate('instructor', '_id username')
      .exec();

    res.status(200).json(all);
  } catch (err) {
    console.log('error in courses', err);
    res.status(400).json({ msg: 'Error fetching courses. Try Again' });
  }
};

const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const user = await User.findById(req.user._id);

    let ids = [];
    let length = user.courses && user.courses.length;
    for (let i = 0; i < length; i++) {
      ids.push(user.courses[i].toString());
    }

    res.json({
      ok: ids.includes(courseId),
    });
  } catch (err) {
    console.log('Error checking enrollment', err);
    res.status(500).json({ ok: false, message: 'Error! Try Again.' });
  }
};

const freeEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (course.paid) return;

    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { courses: course._id },
      },
      {
        new: true,
      }
    );
    res.json(result);
  } catch (err) {
    console.log('Error in free enrollment', err);
    res.status(500).json({ msg: 'Error. Try Again.' });
  }
};

const userCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const courses = await Course.find({ _id: { $in: user.courses } })
      .populate('instructor', '_id username')
      .exec();
    res.json(courses);
  } catch (err) {
    console.log('error in usercourses', err);
    res.json(500);
  }
};

const markCompleted = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const existing = await Completed.findOne({
      user: req.user._id,
      course: courseId,
    }).exec();

    if (existing) {
      //updating the document
      const updated = await Completed.findOneAndUpdate(
        {
          user: req.user._id,
          course: courseId,
        },
        {
          $addToSet: { lessons: lessonId },
        },
        {
          new: true,
        }
      );

      res.json({ ok: true, message: updated });
    } else {
      //create new
      const created = await new Completed({
        user: req.user._id,
        course: courseId,
        lessons: lessonId,
      }).save();
      res.json({ ok: true, message: created });
    }
  } catch (error) {
    console.log('error in markcompleted', err);
    res.status(500).json({ ok: false, msg: 'Error. Try Again.' });
  }
};

const listCompleted = async (req, res) => {
  try {
    const list = await Completed.findOne({
      user: req.user._id,
      course: req.body.courseId,
    }).exec();

    res.json(list);
  } catch (err) {
    console.log('error in list-completed', err);
    res.json(500);
  }
};

const markIncomplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const updated = await Completed.findOneAndUpdate(
      {
        user: req.user._id,
        course: courseId,
      },
      {
        $pull: { lessons: lessonId },
      },
      {
        new: true,
      }
    );
    res.json({ ok: true, message: updated });
  } catch (err) {
    console.log('error in mark incompletet', err);
    res.status(500).json({ ok: false, msg: 'Error. Try Again.' });
  }
};

module.exports = {
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
};
