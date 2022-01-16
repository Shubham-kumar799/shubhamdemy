//components
import ReactPlayer from 'react-player';
import { Button, Divider, Tooltip } from 'antd';
import ReactMarkdown from 'react-markdown';

//utils
import axios from 'axios';
import { Context } from '../context';
import { useContext } from 'react';

//icons
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';

const StudentLesson = ({ setCompleted, lesson, courseId, lessonCompleted }) => {
  const { success, error } = useContext(Context);

  const markCompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-completed`, {
        courseId,
        lessonId: lesson._id,
      });
      setCompleted(data);
      success({ msg: 'Lesson marked as completed' });
    } catch (err) {
      console.log('error marking completed', err);
      error({ msg: 'Error marking Completed. Try Again' });
    }
  };

  const markIncomplete = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId,
        lessonId: lesson._id,
      });
      setCompleted(data);
      success({ msg: 'Lesson removed from completed' });
    } catch (err) {
      console.log('error marking completed', err);
      error({ msg: 'Error. Try Again' });
    }
  };

  return (
    <div>
      <div className="m-2 flex items-center justify-center">
        <ReactPlayer
          url={lesson?.video?.Location}
          controls
          width="80%"
          height="50%"
          onEnded={() => markCompleted()}
        />
      </div>
      <div className="m-2 p-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-medium">{lesson.title}</p>
          {lessonCompleted ? (
            <Tooltip title="Remove from completed" color="red">
              <Button danger type="text" onClick={() => markIncomplete()}>
                <CancelIcon />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Mark as Completed">
              <Button type="primary" onClick={() => markCompleted()}>
                <AddTaskIcon className="cursor-pointer" />
              </Button>
            </Tooltip>
          )}
        </div>
        <Divider />

        <ReactMarkdown>{lesson.content}</ReactMarkdown>
      </div>
    </div>
  );
};
export default StudentLesson;
