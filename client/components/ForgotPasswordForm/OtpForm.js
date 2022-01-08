//components
import { Spin, Input, Form, Button } from 'antd';

//utils
import { Context } from '../../context';
import { useState, useContext } from 'react';
import axios from 'axios';

//icons
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const OtpForm = ({ email, prev, next }) => {
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const { success } = useContext(Context);

  const handleSubmit = async values => {
    try {
      console.log('Opt', values.otp);
      setLoading(true);
      const { data } = await axios.post('/api/verify-otp', {
        email,
        Otp: values.otp,
      });
      success({ msg: 'OTP Verification successful' });
      next();
    } catch (err) {
      setOtpError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-customError  text-white text-center mb-4">
        {otpError && otpError}
      </div>
      <Form name="normal_login" className="login-form" onFinish={handleSubmit}>
        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: 'Enter the OTP you received in you email',
            },
          ]}
        >
          <Input.Password
            prefix={<VpnKeyIcon className="site-form-item-icon" />}
            placeholder="OTP"
          />
        </Form.Item>
        <div className="flex flex-row">
          <Form.Item className="w-full">
            <Button type="primary" htmlType="submit" className="w-full mr-2">
              {loading ? <Spin size="small" /> : 'Verify OTP'}
            </Button>
          </Form.Item>
          <Button onClick={() => prev()} className="w-full ml-2">
            Previous
          </Button>
        </div>
      </Form>
    </>
  );
};

export default OtpForm;
