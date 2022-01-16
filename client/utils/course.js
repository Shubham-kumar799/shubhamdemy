//components
import { Modal } from 'antd';

//utils
import axios from 'axios';

//icons
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

const handlePublishAndUnpublish = ({ course, setCourse, success, error }) => {
  const publishCourse = async () => {
    try {
      const { data } = await axios.put(`/api/course/publish/${course._id}`);
      success({ msg: 'Congrats! Your course is now live' });
      setCourse(data);
    } catch (err) {
      console.log('error publishing course', err);
      error({ msg: 'Error publishing course. Try Again' });
    }
  };

  const confirmPublish = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <CheckCircleOutlined />,
      content:
        'Are you sure you want to publish the course. The course will be live to the users.',
      okText: 'Yes',
      cancelText: 'No',
      centered: 'centered',
      onOk: () => publishCourse(),
    });
  };

  const takeDownCourse = async () => {
    try {
      const { data } = await axios.put(`/api/course/unpublish/${course._id}`);
      success({ msg: 'Your course in unpublished' });
      setCourse(data);
    } catch (err) {
      console.log('error takedown course', err);
      error({ msg: 'Error. Try Again' });
    }
  };

  const confirmTakedown = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined danger />,
      content:
        'Are you sure you want to takedown the course.   Users will not be able to access the course anymore.',
      okText: 'Yes',
      cancelText: 'No',
      centered: 'centered',
      onOk: () => takeDownCourse(),
    });
  };

  if (course.published) {
    confirmTakedown();
  } else {
    confirmPublish();
  }
};

const handleFreeAndPaidEnrollment = async ({
  success,
  error,
  _id,
  price,
  setEnrolled,
  router,
  slug,
}) => {
  const handleFreeEnrollment = async () => {
    try {
      const { data } = await axios.post(`/api/free-enrollment/${_id}`);
      setEnrolled(true);
      success({ msg: 'Enrollment successful' });
      router.push(`/user/course/${slug}`);
    } catch (err) {
      console.log('Error in free enrollment', err);
      error({ msg: 'Enrollment failed. Try Again.' });
    }
  };

  if (price == 0) {
    handleFreeEnrollment();
  } else {
    error({ msg: 'Paid enrollments are disabled at the moment' });
  }
};

export { handlePublishAndUnpublish, handleFreeAndPaidEnrollment };
