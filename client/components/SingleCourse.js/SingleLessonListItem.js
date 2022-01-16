//components
import { List, Button, Modal } from 'antd';
import ReactPlayer from 'react-player';

//utils
import { useState } from 'react';

//icons
import LockIcon from '@mui/icons-material/Lock';

const { Item } = List;
const { Meta } = Item;

const SingleLessonListItem = ({ lesson }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Item>
      <Modal
        centered
        visible={visible}
        title={lesson.title}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
      >
        <div className="flex items-center justify-center">
          <ReactPlayer
            url={lesson?.video?.Location}
            width="410px"
            height="240px"
            controls
          />
        </div>
      </Modal>
      <Meta title={lesson.title} />
      {lesson.free_preview ? (
        <Button type="link" onClick={() => setVisible(true)}>
          preview{' '}
        </Button>
      ) : (
        <LockIcon />
      )}
    </Item>
  );
};

export default SingleLessonListItem;
