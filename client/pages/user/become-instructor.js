//NOT_COMPLETED

//components
import { Button } from 'antd';

//utils
import { useContext, useState } from 'react';
import { Context } from '../../context';
import axios from 'axios';

//icons
import { LoadingOutlined, CreditCardOutlined } from '@ant-design/icons';

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
    error,
  } = useContext(Context);

  const becomeInstructor = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/make-instructor');
      window.location.href = response.data;
    } catch (err) {
      console.log('Error onboarding stripe', err);
      error({ msg: 'Stripe onboarding failed. Try Again' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col  items-center justify-center">
      <h1 className="underline font-medium text-2xl m-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Setup payout to publish courses
      </h1>
      <p className="text-lg font-medium">
        ShubhamDemy partners with stripe to transfer earnings to your bank
        account
      </p>
      <div className="m-4">
        <Button
          // disabled={
          //   loading || (user && user.role && user.role.includes('Instructor'))
          // }
          disabled={true}
          onClick={() => becomeInstructor()}
          shape="round"
          type="primary"
          icon={loading ? <LoadingOutlined /> : <CreditCardOutlined />}
        >
          Setup Stripe Payments For Your Account
        </Button>
      </div>
      <p className="text-md font-medium italic">
        You will be redirected to stripe to complete the process
      </p>
    </div>
  );
};

export default BecomeInstructor;
