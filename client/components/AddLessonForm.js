//components
import { Form, Switch, Input, Divider, Upload, Button, Progress } from 'antd';

//utils
import { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { Context } from '../context';

//icons
import {
  UploadOutlined,
  DeleteOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';

const AddLessonForm = ({ setVisible, setCourse, slug, course }) => {
  const [video, setVideo] = useState();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { success, error } = useContext(Context);
  const formRef = useRef(null);

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const uploadVideo = async file => {
    try {
      console.log('In upload video');
      setUploading(true);
      const videoData = new FormData();
      videoData.append('video', file);

      //progressBar
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: e => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      console.log('video', data);
      setVideo(data);
      success({ msg: 'Video uploaded successfully' });
    } catch (err) {
      error({ msg: 'Video uploaded failed. Try Again' });
    } finally {
      setUploading(false);
    }
  };

  const handleBeforeUpload = async file => {
    uploadVideo(file);

    return false;
  };

  const handleRemoveVideo = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/remove-video/${course.instructor._id}`,
        {
          Bucket: video.Bucket,
          Key: video.Key,
        }
      );
      setVideo();
      setProgress(0);
    } catch (err) {
      console.log('error removing video', err);
      error({ msg: err.response.message });
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    showUploadList: {
      showRemoveIcon: uploading ? false : true,
      removeIcon: <DeleteOutlined onClick={e => handleRemoveVideo()} />,
    },
  };

  const handleSubmit = async values => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        {
          title: values.title,
          content: values.content,
          free_preview: values.preview,
          video,
        }
      );

      setCourse(data);
      formRef.current.resetFields();
      setVideo();
      success({ msg: 'Lesson upload successful' });
      setVisible(false);
    } catch (err) {
      console.log('error uploading lesson', err.response.data.message);

      error({ msg: err.response.data.message });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Form onFinish={handleSubmit} ref={formRef}>
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: 'Enter the title of the lesson',
          },
          {
            min: 6,
            message: 'Lesson title should have atleast 6 characters',
          },
          {
            max: 200,
            message:
              'Lesson title can only have maximum of  200 characters only',
          },
        ]}
      >
        <Input placeholder="Title of the lesson" />
      </Form.Item>
      <Form.Item
        name="content"
        rules={[
          {
            required: true,
            message: 'Add content for the lesson',
          },
          {
            max: 20000,
            message: 'Content can only have a maximum of 20,000 characters',
          },
        ]}
      >
        <Input.TextArea
          rows={6}
          placeholder="Add content for the lesson"
          showCount
          maxLength={20000}
        />
      </Form.Item>
      <Form.Item
        name="video"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Upload video for the lesson"
        rules={[
          {
            required: true,
            message: 'Upload video  for the lesson',
          },
        ]}
      >
        <Upload
          {...uploadProps}
          maxCount={1}
          name="logo"
          action="/api/course/upload-image"
          listType="picture"
          accept="video/*"
          beforeUpload={file => handleBeforeUpload(file)}
        >
          <Button
            disabled={uploading}
            loading={uploading}
            icon={<UploadOutlined />}
          >
            Upload Video
          </Button>
        </Upload>
      </Form.Item>
      {progress != 0 && <Progress percent={progress} />}
      <Form.Item valuePropName="checked" name="preview" label="Free Preview">
        <Switch />
      </Form.Item>
      <Divider />
      <div className=" flex flex-row-reverse">
        <Form.Item>
          <Button
            icon={<CloudUploadOutlined />}
            disabled={uploading}
            type="primary"
            htmlType="submit"
          >
            Upload Lesson
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddLessonForm;
