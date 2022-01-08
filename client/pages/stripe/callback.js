//components
import { Spin } from 'antd';

//utils
import { useEffect, useContext } from 'react';
import { Context } from '../../context';
import axios from 'axios';

const StripeCallback = () => {
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios.post('/api/get-account-status').then(res => {
        // window.location.href = '/instructor';
        console.log('response', res);
      });
    }
  }, [user]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <Spin />
    </div>
  );
};

export default StripeCallback;
