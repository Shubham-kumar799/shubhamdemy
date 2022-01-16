//components
import { Spin } from 'antd';

//utils
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../context';

const CheckUser = ({ children }) => {
  const [ok, setOk] = useState(false);

  const { dispatch } = useContext(Context);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/current-user');
      if (data.ok) setOk(true);
    } catch (error) {
      console.log('Error fetching user', error);
      setOk(false);
      dispatch({
        type: 'LOGOUT',
      });
      window.localStorage.removeItem('user');
      router.push('/login');
    }
  };

  useEffect(() => {
    fetchUser();
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

export default CheckUser;
