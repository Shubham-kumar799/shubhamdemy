//components
import { Input, Button, Form } from 'antd';
import Link from 'next/link';

//utils
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context';
import { useApi } from '../../hooks';

//icons
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const LoginForm = () => {
  const [loginError, setLoginError] = useState(null);
  const { dispatch, success } = useContext(Context);
  const [res, API] = useApi({
    url: `/api/login`,
    method: 'post',
  });

  const handleSubmit = values => {
    API({
      body: {
        email: values.email,
        password: values.password,
      },
    });
  };

  useEffect(() => {
    if (res.error) {
      setLoginError(res.error?.response?.data?.message);
    }
    if (res.data?.ok) {
      dispatch({
        type: 'LOGIN',
        payload: res.data.user,
      });
      window.localStorage.setItem('user', JSON.stringify(res.data.user));
      success({ msg: 'Login Successful' });
    }
  }, [res.data, res.error]);

  return (
    <div className="flex flex-col w-2/3 sm:w-2/5 md:w-1/3">
      <h1 className="text-xl mt-4">Welcome back...</h1>
      <div className="bg-black h-1 mb-4"></div>
      <div className="bg-customError  text-white text-center mb-4">
        {loginError && loginError}
      </div>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
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
          <Button
            loading={res.loading}
            disabled={res.loading}
            htmlType="submit"
            className="w-full"
          >
            Login
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
