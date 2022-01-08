//components
import { message } from 'antd';

//utils
import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const initialState = {
  user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    default:
      return state;
  }
};

// context provider

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const { user } = state;
  const router = useRouter();

  const success = ({ msg }) => {
    message.success(msg);
  };

  const error = ({ msg }) => {
    message.error(msg);
  };

  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  useEffect(() => {
    if (!user) {
      axios
        .get('/api/logout')
        .then(data => {
          dispatch({ type: 'LOGOUT' });
          window.localStorage.removeItem('user');
          router.push('/login');
        })
        .catch(err => {
          console.log('force logout error', err);
        });
    }
  }, [user]);

  // handling expired token
  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config._isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get('/api/logout')
            .then(data => {
              console.log('/401 error > logout');
              dispatch({ type: 'LOGOUT' });
              window.localStorage.removeItem('user');
              router.push('/login');
            })
            .catch(err => {
              console.log('axios interceptors error', err);
              reject(error);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token');
      axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
    };

    getCsrfToken();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch, success, error }}>
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
