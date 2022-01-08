//components
import { Input, Button, Form, Spin } from 'antd';
import Link from 'next/link';

//utils
import { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../context';
import { useRouter } from 'next/router';

//icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const LoginForm = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const { dispatch, success } = useContext(Context);
  const router = useRouter();

  const handleSubmit = async values => {
    setLoading(true);
    setLoginError(null);
    try {
      const { data } = await axios.post(`/api/login`, {
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
      success({ msg: 'Login Successful' });
    } catch (err) {
      setLoginError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-2/3 sm:w-2/5 md:w-1/3">
      <h1 className="text-xl mt-4">Welcome back...</h1>
      <div className="bg-black h-1 mb-4"></div>
      <div className="bg-customError  text-white text-center mb-4">
        {loginError && loginError}
      </div>
      <Form
        name="normal_login"
        ref={formRef}
        className="login-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email',
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
          ]}
        >
          <Input.Password
            prefix={<LockIcon className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="w-full">
            {loading ? <Spin size="small" /> : 'Login'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Link href="/forgot-password">
            <a className="login-form-forgot text-blue-600">Forgot password</a>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
