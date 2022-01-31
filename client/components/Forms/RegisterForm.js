//components
import { Input, Form, Button } from 'antd';

//utils
import { Context } from '../../context';
import { useState, useContext, useEffect } from 'react';
import { useApi } from '../../hooks';

//icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const RegisterForm = () => {
  const [registerError, setRegisterError] = useState(null);
  const { success, dispatch } = useContext(Context);
  const [res, API] = useApi({
    url: `/api/register`,
    method: 'post',
  });

  const handleSubmit = values => {
    API({
      body: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    });
  };

  useEffect(() => {
    if (res.data?.ok) {
      dispatch({
        type: 'LOGIN',
        payload: res.data.user,
      });
      window.localStorage.setItem('user', JSON.stringify(res.data.user));
      success({ msg: 'Registration Successful' });
    }

    if (res.error) {
      setRegisterError(apiError?.response?.data?.message);
    }
  }, [res.error, res.data]);

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
          <Button
            loading={res.loading}
            disabled={res.loading}
            htmlType="submit"
            className="w-full"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
