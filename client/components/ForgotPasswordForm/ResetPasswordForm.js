//components
import { Spin, Input, Form, Button } from 'antd';

//utils
import { useState, useContext } from 'react';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import axios from 'axios';

//icons
import LockIcon from '@mui/icons-material/Lock';

const ResetPasswordForm = ({ email, prev }) => {
  const [resetPasswordError, setResetPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success } = useContext(Context);
  const router = useRouter();

  const handleSubmit = async values => {
    try {
      console.log('NewPassword,', values.newPassword);
      setLoading(true);
      const { data } = await axios.post('/api/reset-password', {
        newPassword: values.newPassword,
        email,
      });
      success({ msg: 'Password Reset Successful.' });
      router.push('/login');
      success({ msg: 'Login with you new password.' });
    } catch (err) {
      setResetPasswordError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
          <Button disabled={loading} htmlType="submit" className="w-full">
            {loading ? <Spin size="small" /> : 'Reset Password'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
