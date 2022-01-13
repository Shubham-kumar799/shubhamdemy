//components
import { List, Avatar, Button, Modal, Typography } from 'antd';
import UpdateLessonForm from './UpdateLessonForm';

//utils
import { useState, useContext } from 'react';
import { Context } from '../context';

//icons
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Paragraph } = Typography;

const LessonUpdateModal = ({
  setCourse,
  course,
  setVisible,
  lesson,
  visible,
  index,
  slug,
}) => {
  return (
    <Modal
      title={`Update Lesson ${index}`}
      centered
      visible={visible}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      footer={null}
      style={{
        paddingBottom: 0,
      }}
    >
      <UpdateLessonForm
        slug={slug}
        course={course}
        setVisible={setVisible}
        lesson={lesson}
        setCourse={setCourse}
      />
    </Modal>
  );
};

const ListLessonItem = ({ course, slug, setCourse, item, index }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { error, success } = useContext(Context);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/course/${slug}/${item._id}`);

      success({ msg: 'Lesson deleted successfully' });
      setCourse(data);
      setDeleteVisible(false);
    } catch (err) {
      console.log('error deleting lesson', err);
      error({ msg: err.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LessonUpdateModal
        visible={visible}
        setVisible={setVisible}
        lesson={item}
        index={index + 1}
        course={course}
        setCourse={setCourse}
        slug={slug}
      />
      <Modal
        visible={deleteVisible}
        title={`Delete`}
        centered
        footer={[
          <Button
            disabled={loading}
            loading={loading}
            onClick={() => setDeleteVisible(false)}
          >
            Cancel
          </Button>,
          <Button
            disabled={loading}
            loading={loading}
            type="primary"
            onClick={() => handleDelete()}
            icon={<DeleteOutlined />}
            danger
          >
            Yes! Go ahead
          </Button>,
        ]}
        onOk={() => setDeleteVisible(false)}
        onCancel={() => setDeleteVisible(false)}
      >
        <h1 className="inline">
          Are your sure you want to delete the lesson :{' '}
        </h1>
        <p className="inline underline text-rose-500 font-medium italic">{`${item.title}`}</p>{' '}
        ?
      </Modal>
      <List.Item
        actions={[
          <Button onClick={() => setVisible(true)} icon={<EditOutlined />} />,
          <Button
            onClick={() => setDeleteVisible(true)}
            icon={<DeleteOutlined />}
            danger
          />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar>{index + 1}</Avatar>}
          title={item.title}
          description={
            <Paragraph
              ellipsis={{
                rows: 2,
                expandable: true,
                symbol: 'more',
              }}
            >
              {item.content}
            </Paragraph>
          }
        />
      </List.Item>
    </>
  );
};

export default ListLessonItem;
