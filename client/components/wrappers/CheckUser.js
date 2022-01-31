//components
import Loader from '../ui/Loader';

//utils
import { useEffect, useContext } from 'react';
import { Context } from '../../context';
import { useRouter } from 'next/router';
import { useApi } from '../../hooks';

const CheckUser = ({ children }) => {
  const { dispatch } = useContext(Context);
  const router = useRouter();
  const [res, checkUserAPI] = useApi({
    headers: null,
    method: 'get',
    url: '/api/current-user',
  });

  useEffect(() => {
    checkUserAPI({});
  }, []);

  if (res.error) {
    dispatch({
      type: 'LOGOUT',
    });
    window.localStorage.removeItem('user');
    router.push('/login');
  }

  return <>{res?.data?.ok ? <>{children}</> : <Loader />}</>;
};

export default CheckUser;
