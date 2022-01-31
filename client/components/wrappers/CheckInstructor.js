//components
import Loader from '../ui/Loader';

//utils
import { useEffect, useContext } from 'react';
import { Context } from '../../context';
import router from 'next/router';
import { useApi } from '../../hooks';

const CheckInstructor = ({ children }) => {
  const { error } = useContext(Context);
  const [res, checkInstructorAPI] = useApi({
    url: '/api/current-instructor',
    method: 'get',
  });

  useEffect(() => {
    checkInstructorAPI({});
  }, []);

  if (res.error) {
    error({ msg: 'Unauthorized' });
    router.push('/');
  }

  return <>{res?.data?.ok ? <>{children}</> : <Loader />}</>;
};

export default CheckInstructor;
