//components
import { Input, Form, Button } from 'antd';

//utlis
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context';
import { useApi } from '../../hooks';

//icons
import EmailIcon from '@mui/icons-material/Email';

const EmailForm = ({ setEmail, next }) => {
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const { success } = useContext(Context);
  const [res, API] = useApi({
    url: '/api/forgot-password',
    method: 'post',
  });

  const handleSubmit = values => {
    API({
      body: {
        email: values.email,
      },
    });
    setEmail(values.email);
  };

  useEffect(() => {
    if (res.error) {
      setForgotPasswordError(res?.error?.response?.data?.message);
    }
    if (res.data) {
      success({ msg: 'Check your email for OTP' });
      next();
    }
  }, [res.error, res.data]);

  return (
    <>
      <div className="bg-customError  text-white text-center mb-4">
        {forgotPasswordError && forgotPasswordError}
      </div>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Enter an email where we can contact you',
            },
            {
              pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
              message: 'Enter a valid email',
            },
          ]}
        >
          <Input
            prefix={<EmailIcon className="site-form-item-icon" />}
            placeholder="email"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={res.loading}
            disabled={res.loading}
            htmlType="submit"
            className="w-full"
          >
            Send OTP
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EmailForm;
