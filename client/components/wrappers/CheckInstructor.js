//components
import { Spin } from 'antd';

//utils
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context';
import router from 'next/router';

const CheckInstructor = ({ children }) => {
  const [ok, setOk] = useState(false);

  const { error } = useContext(Context);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get('/api/current-instructor');
      if (data.ok) setOk(true);
    } catch (err) {
      console.log('Error fetching current instructor', err);
      setOk(false);
      error({ msg: 'Unauthorized' });
      router.push('/');
    }
  };

  useEffect(() => {
    fetchInstructor();
  }, []);

  return (
    <>
      {ok ? (
        <>{children}</>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spin className="text-3xl" />
        </div>
      )}
    </>
  );
};

export default CheckInstructor;
