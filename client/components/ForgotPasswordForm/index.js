//components
import { Steps } from 'antd';
import EmailForm from './EmailForm';
import OtpForm from './OtpForm';
import ResetPasswordForm from './ResetPasswordForm';

//utils
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context';
import { useRouter } from 'next/router';

//icons
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import { UserOutlined, SolutionOutlined } from '@ant-design/icons';

const { Step } = Steps;

const steps = [
  {
    title: 'Enter email',
    icon: <MarkEmailUnreadOutlinedIcon />,
  },
  {
    title: 'Verification',
    icon: <UserOutlined />,
  },
  {
    title: 'Reset password',
    icon: <SolutionOutlined />,
  },
];

const ForgotPasswordForm = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState(null);

  const {
    state: { user },
  } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="flex  flex-col">
      <h1 className="text-xl mt-4">Let's reset your password...</h1>
      <div className="bg-black  h-1 mb-4"></div>
      <div className="">
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
            <EmailForm setEmail={setEmail} next={next} />
          ) : current == 1 ? (
            <OtpForm email={email} prev={prev} next={next} />
          ) : (
            <ResetPasswordForm email={email} prev={prev} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
