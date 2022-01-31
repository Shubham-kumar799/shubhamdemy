//components
import { Input, Form, Button } from 'antd';

//utils
import { Context } from '../../context';
import { useState, useContext, useEffect } from 'react';
import { useApi } from '../../hooks';

//icons
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const OtpForm = ({ email, prev, next }) => {
  const [otpError, setOtpError] = useState(null);
  const { success } = useContext(Context);
  const [res, API] = useApi({
    url: '/api/verify-otp',
    method: 'post',
  });

  const handleSubmit = values => {
    API({
      body: {
        email,
        Otp: values.otp,
      },
    });
  };

  useEffect(() => {
    if (res.data) {
      success({ msg: 'OTP Verification successful' });
      next();
    }
    if (res.error) {
      setOtpError(res.error?.response?.data?.message);
    }
  }, [res.data, res.error]);

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
            <Button
              type="primary"
              disabled={res.loading}
              loading={res.loading}
              htmlType="submit"
              className="w-full mr-2"
            >
              Verify OTP
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
