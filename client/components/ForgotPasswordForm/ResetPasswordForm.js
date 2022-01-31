//components
import { Input, Form, Button } from 'antd';

//utils
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import { useApi } from '../../hooks';

//icons
import LockIcon from '@mui/icons-material/Lock';

const ResetPasswordForm = ({ email, prev }) => {
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const { success } = useContext(Context);
  const router = useRouter();
  const [res, API] = useApi({
    url: '/api/reset-password',
    method: 'post',
  });

  const handleSubmit = values => {
    API({
      body: {
        newPassword: values.newPassword,
        email,
      },
    });
  };

  useEffect(() => {
    if (res.error) {
      setResetPasswordError(res.error?.response?.data?.message);
    }
    if (res.data) {
      success({ msg: 'Password Reset Successful.' });
      router.push('/login');
      success({ msg: 'Login with you new password.' });
    }
  }, [res.error, res.data]);

  return (
    <>
      <div className="bg-customError  text-white text-center mb-4">
        {resetPasswordError && resetPasswordError}
      </div>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: 'Enter new password',
            },
          ]}
        >
          <Input.Password
            prefix={<LockIcon className="site-form-item-icon" />}
            placeholder="New password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={res.loading}
            loading={res.loading}
            htmlType="submit"
            className="w-full"
          >
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
