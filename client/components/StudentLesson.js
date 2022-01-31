//components
import ReactPlayer from 'react-player';
import { Button, Divider, Tooltip } from 'antd';
import ReactMarkdown from 'react-markdown';

//utils
import { Context } from '../context';
import { useContext, useEffect } from 'react';
import { useApi } from '../hooks';

//icons
import AddTaskIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';

const StudentLesson = ({ setCompleted, lesson, courseId, lessonCompleted }) => {
  const { success, error } = useContext(Context);
  const [completeRes, completeAPI] = useApi({
    url: `/api/mark-completed`,
    method: 'post',
  });
  const [incompleteRes, incompleteAPI] = useApi({
    url: `/api/mark-incomplete`,
    method: 'post',
  });

  useEffect(() => {
    if (incompleteRes.data?.ok) {
      setCompleted(incompleteRes.data.message);
      success({ msg: 'Lesson removed from completed' });
    }
    if (incompleteRes.error) {
      error({ msg: 'Error. Try Again' });
    }
  }, [incompleteRes.data, incompleteRes.error]);

  useEffect(() => {
    if (completeRes.data?.ok) {
      setCompleted(completeRes.data.message);
      success({ msg: 'Lesson marked as completed' });
    }
    if (completeRes.error) {
      error({ msg: 'Error marking Completed. Try Again' });
    }
  }, [completeRes.data, completeRes.error]);

  return (
    <div>
      <div className="m-2 flex items-center justify-center">
        <ReactPlayer
          url={lesson?.video?.Location}
          controls
          width="80%"
          height="50%"
          onEnded={() =>
            completeAPI({
              body: {
                courseId,
                lessonId: lesson._id,
              },
            })
          }
        />
      </div>
      <div className="m-2 p-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-medium">{lesson.title}</p>
          {lessonCompleted ? (
            <Tooltip title="Remove from completed" color="red">
              <Button
                danger
                type="text"
                onClick={() =>
                  incompleteAPI({
                    body: {
                      courseId,
                      lessonId: lesson._id,
                    },
                  })
                }
              >
                <CancelIcon />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Mark as Completed">
              <Button
                type="primary"
                onClick={() =>
                  completeAPI({
                    body: {
                      courseId,
                      lessonId: lesson._id,
                    },
                  })
                }
              >
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
