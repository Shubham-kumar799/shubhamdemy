//components
import { Input, Form, Spin, Button } from 'antd';

//utils
import { Context } from '../context';
import { useState, useContext } from 'react';
import axios from 'axios';
import router from 'next/router';

//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const { success, dispatch } = useContext(Context);

  const handleSubmit = async values => {
    setLoading(true);
    setRegisterError(null);

    try {
      const { data } = await axios.post(`/api/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      dispatch({
        type: 'LOGIN',
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem('user', JSON.stringify(data));
      router.push('/user');
      success({ msg: 'Registration Successful' });
    } catch (err) {
      setRegisterError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-2/3 sm:w-2/5 md:w-1/3">
      <h1 className="text-xl mt-4">Get Started Here...</h1>
      <div className="bg-black h-1  mb-4"></div>
      <div className="bg-customError  text-white text-center mb-4">
        {registerError && registerError}
      </div>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Enter your username',
            },
            {
              whitespace: true,
              message: 'Enter a valid username',
            },
          ]}
        >
          <Input
            prefix={<AccountCircleIcon className="site-form-item-icon" />}
            placeholder="username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Enter your email',
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Enter your password',
            },
            {
              whitespace: true,
              message: 'Enter a valid password',
            },
            {
              min: 6,
              message: 'Password should be atleast 6 characters long',
            },
          ]}
        >
          <Input.Password
            prefix={<LockIcon className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button disabled={loading} htmlType="submit" className="w-full">
            {loading ? <Spin size="small" /> : 'Sign up'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
