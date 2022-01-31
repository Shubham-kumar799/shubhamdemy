//components
import {
  Form,
  Input,
  Tag,
  Select,
  Switch,
  Upload,
  Button,
  Divider,
} from 'antd';
import Loader from '../../../../components/ui/Loader';

//utils
import { useState, useContext, useRef, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { Context } from '../../../../context';
import { useRouter } from 'next/router';

//icons
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;
const { Option } = Select;

const tagsData = [
  'Movies',
  'Books',
  'Music',
  'Sports',
  'Node',
  'React',
  'Docker',
  'Flutter',
  'Web Development',
  'Android Development',
  'Java',
  'Phython',
  'Football',
  'Art',
  'Anime',
  'Cartoon',
  'Comic',
  'Other',
];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const CourseEdit = () => {
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [category, setCategory] = useState([]);
  const [initialValues, setInitialValues] = useState();
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const { success, error } = useContext(Context);
  const router = useRouter();
  const formRef = useRef(null);
  const { slug } = router.query;

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/course/${slug}`);
        setImage(data.image);
        setCategory(data.category);
        setIsPaid(data.paid);
        setInitialValues(data);
      } catch (err) {
        console.log('error fetching course', err);
        error({ msg: 'Error. Try Again.' });
        router.push(`/instructor/course/${slug}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [slug]);

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const uploadImage = file => {
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async uri => {
      try {
        setUploading(true);
        const { data } = await axios.post('/api/course/upload-image', {
          image: uri,
        });
        setImage(data);
        success({ msg: 'Image uploaded successfully' });
      } catch (err) {
        error({ msg: 'Image uploaded failed. Try Again' });
      } finally {
        setUploading(false);
      }
    });
  };

  const handleBeforeUpload = async file => {
    uploadImage(file);

    return false;
  };

  const handleRemoveImage = async () => {
    try {
      setUploading(true);
      const res = await axios.post('/api/course/remove-image', { image });
      setImage();
    } catch (err) {
      console.log('error removing image', err);
      error({ msg: err.response.message });
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    showUploadList: {
      showRemoveIcon: uploading ? false : true,
      removeIcon: <DeleteOutlined onClick={e => handleRemoveImage()} />,
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }}>
        <Option value="Rupees">Rupees</Option>
        <Option value="$">$</Option>
      </Select>
    </Form.Item>
  );

  const handleSubmit = async values => {
    try {
      setUploading(true);
      const { data } = await axios.put(`/api/course/${slug}`, {
        title: values.name,
        description: values.description,
        paid: values.paid,
        price: values.price,
        image,
        category,
      });
      formRef.current.resetFields();
      setImage();
      router.push(`/instructor/course/view/${slug}`);
      success({ msg: 'Course successfully updated' });
    } catch (err) {
      console.log('error uploading course', err.response.data.message);

      error({ msg: err.response.data.message });
    } finally {
      setUploading(false);
    }
  };

  const handleCategoryChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...category, tag]
      : category.filter(t => t !== tag);
    setCategory(nextSelectedTags);
  };

  if (loading) return <Loader />;

  const handleFailed = values => {
    console.log('values ====> failed', values);
  };

  return (
    <Form
      {...formItemLayout}
      initialValues={{
        prefix: 'Rupees',
        name: initialValues.title,
        thumbnail: [initialValues.image],
        ...initialValues,
      }}
      onFinishFailed={handleFailed}
      onFinish={handleSubmit}
      ref={formRef}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Enter the name of the course',
          },
          {
            min: 10,
            message: 'Course name should have atleast 10 characters',
          },
          {
            max: 320,
            message: 'Course name can  have maximum of  320 characters only',
          },
        ]}
      >
        <Input placeholder="Name of the Course" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Enter the description for the course',
          },
          {
            max: 10000,
            message: 'Description can  have maximum of  10000 letters only',
          },
        ]}
      >
        <Input.TextArea
          placeholder="Add description for your course"
          showCount
          maxLength={10000}
        />
      </Form.Item>
      <Form.Item name="paid" label="Paid" valuePropName="checked">
        <Switch onChange={e => setIsPaid(e)} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            required: isPaid && true,
            message: 'Enter the price for your course',
          },
          {
            pattern: '^[0-9]*$',
            message: 'Enter a valid price',
          },
        ]}
      >
        <Input
          disabled={!isPaid}
          addonAfter={prefixSelector}
          placeholder="Add price for your course"
        />
      </Form.Item>

      <Form.Item
        name="thumbnail"
        label="Thumbnail"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Upload thumbnail for your course"
        rules={[
          {
            required: true,
            message: 'Upload thumbnail for your course',
          },
        ]}
      >
        <Upload
          {...uploadProps}
          maxCount={1}
          name="logo"
          action="/api/course/upload-image"
          listType="picture"
          beforeUpload={file => handleBeforeUpload(file)}
        >
          <Button
            disabled={uploading}
            loading={uploading}
            icon={<UploadOutlined />}
          >
            Click to upload
          </Button>
        </Upload>
      </Form.Item>
      <Form.Item
        valuePropName={category}
        rules={[
          {
            required: true,
            required: category.length != 0 ? false : true,
            message: 'Select category for your course',
          },
        ]}
        name="category"
        label="Category"
      >
        {tagsData.map(tag => (
          <CheckableTag
            key={tag}
            checked={category.indexOf(tag) > -1}
            onChange={checked => handleCategoryChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Form.Item>
      <Divider />
      <div className="flex   items-center justify-evenly flex-row">
        <Form.Item>
          <Button danger onClick={() => router.back()} disabled={uploading}>
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            disabled={uploading}
            type="primary"
            shape="round"
            htmlType="submit"
          >
            Update
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CourseEdit;
