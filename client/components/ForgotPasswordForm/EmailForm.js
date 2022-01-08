//components
import { Spin, Input, Form, Button } from 'antd';

//utlis
import { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context';

//icons
import EmailIcon from '@mui/icons-material/Email';

const EmailForm = ({ setEmail, next }) => {
  const [loading, setLoading] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const { success } = useContext(Context);

  const handleSubmit = async values => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/forgot-password', {
        email: values.email,
      });
      success({ msg: 'Check your email for OTP' });
      setEmail(values.email);
      next();
    } catch (err) {
      setForgotPasswordError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
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
          <Button htmlType="submit" className="w-full">
            {loading ? <Spin size="small" /> : 'Send OTP'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EmailForm;
