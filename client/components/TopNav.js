//components
import Link from 'next/link';
import { Menu, Button } from 'antd';
import AppButton from './ui/AppButton';

//utils
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Context } from '../context';

//icons
import { AppstoreAddOutlined, TeamOutlined } from '@ant-design/icons';

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState('');
  const { state, dispatch, success } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    try {
      dispatch({ type: 'LOGOUT' });
      await window.localStorage.removeItem('user');
      const { data } = await axios.get('/api/logout');
      success({ msg: data.message });
      router.push('/login');
    } catch (e) {
      error({ msg: e.response.data.message });
    }
  };

  return (
    <Menu
      mode="horizontal"
      className="items-center flex font-medium"
      selectedKeys={[current]}
    >
      <Item className="no-underline" key="/" onClick={e => setCurrent(e.key)}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      {!user ? (
        <>
          <Item key="/login" onClick={e => setCurrent(e.key)}>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item key="/register" onClick={e => setCurrent(e.key)}>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      ) : (
        <>
          <Item
            className="no-underline "
            key="/user"
            onClick={e => setCurrent(e.key)}
          >
            <Link href="/user">
              <a>Profile</a>
            </Link>
          </Item>
        </>
      )}
      <div className="absolute flex flex-row right-2">
        {user && user.role && user.role.includes('Instructor') ? (
          <Item
            className="overflow-hidden  hover:bg-white"
            key="/instructor/course/create"
            onClick={e => setCurrent(e.key)}
          >
            <Button
              onClick={() => router.push('/instructor/course/create')}
              className="mr-8"
              shape="round"
              icon={<AppstoreAddOutlined />}
            >
              Create Course
            </Button>
          </Item>
        ) : (
          <Item
            className="overflow-hidden  hover:bg-white"
            key="/user/become-instructor"
            onClick={e => setCurrent(e.key)}
          >
            <Button
              color="blue"
              onClick={() => router.push('/user/become-instructor')}
              shape="round"
              icon={<TeamOutlined />}
            >
              Become an Instructor
            </Button>
          </Item>
        )}

        {user && (
          <Item key="/logout" onClick={e => setCurrent(e.key)}>
            <Button danger onClick={logout} type="round">
              Logout
            </Button>
          </Item>
        )}
      </div>
    </Menu>
  );
};

export default TopNav;
