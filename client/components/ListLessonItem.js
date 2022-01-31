//components
import { List, Avatar, Button, Modal, Typography } from 'antd';
import { UpdateLessonForm } from './Forms';

//utils
import { useState, useContext, useEffect } from 'react';
import { Context } from '../context';
import { useApi } from '../hooks';

//icons
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { error, success } = useContext(Context);
  const [res, API] = useApi({
    url: `/api/course/${slug}/${item._id}`,
    method: 'put',
  });

  useEffect(() => {
    if (res.data?.ok) {
      success({ msg: 'Lesson deleted successfully' });
      setCourse(res.data?.message);
      setDeleteVisible(false);
    }
    if (res.error) {
      error({ msg: err.response.data.message });
    }
  }, [res.error, res.data]);

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
            disabled={res.loading}
            loading={res.loading}
            onClick={() => setDeleteVisible(false)}
          >
            Cancel
          </Button>,
          <Button
            disabled={res.loading}
            loading={res.loading}
            type="primary"
            onClick={() => API({})}
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
