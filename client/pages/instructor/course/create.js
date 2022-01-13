//components
import { Steps } from 'antd';
import CreateCourseForm from '../../../components/CreateCourseForm';
import CheckInstructor from '../../../components/wrappers/CheckInstructor';

//utils
import { useState } from 'react';

//icons
import { CloudUploadOutlined, ProfileOutlined } from '@ant-design/icons';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const { Step } = Steps;

const steps = [
  {
    title: 'Enter details',
    icon: <ProfileOutlined />,
  },
  {
    title: 'Upload lessons',
    icon: <CloudUploadOutlined />,
  },
  {
    title: 'Publish',
    icon: <PublishedWithChangesIcon />,
  },
];

const CreateCourse = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <CheckInstructor>
      <div className="flex items-center  flex-col ">
        <h1 className="text-xl font-medium text-customPrimary  m-4 self-center">
          Let's upload a new Course
        </h1>
        <div>
          <Steps
            className=""
            labelPlacement="vertical"
            size="small"
            current={current}
          >
            {steps.map(item => (
              <Step
                className="mb-4"
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </Steps>

          <div className="steps-content">
            {current == 0 ? (
              <CreateCourseForm next={next} />
            ) : current == 1 ? (
              <div> Second step</div>
            ) : (
              <div> Third step</div>
            )}
          </div>
        </div>
      </div>
    </CheckInstructor>
  );
};

export default CreateCourse;
