//components
import Link from 'next/link';
import { Menu, Button, Dropdown, Space } from 'antd';

//utils
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Context } from '../context';

//icons
import {
  AppstoreAddOutlined,
  MenuOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const { Item } = Menu;

const TopMenu = props => {
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
    <Menu {...props} className={props.menustyles} selectedKeys={[current]}>
      <Item
        {...props}
        className="no-underline"
        key="/"
        onClick={e => setCurrent(e.key)}
      >
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      {!user ? (
        <>
          <Item {...props} key="/login" onClick={e => setCurrent(e.key)}>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item {...props} key="/register" onClick={e => setCurrent(e.key)}>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      ) : (
        <>
          <Item
            {...props}
            className="no-underline "
            key="/user"
            onClick={e => setCurrent(e.key)}
          >
            <Link href="/user">
              <a>My Account</a>
            </Link>
          </Item>
        </>
      )}
      <div className={props.rightmenustyles}>
        {user && user.role && user.role.includes('Instructor') ? (
          <Button
            onClick={() => router.push('/instructor/course/create')}
            className="mr-8"
            shape="round"
            icon={<AppstoreAddOutlined />}
          >
            Create Course
          </Button>
        ) : (
          <Button
            color="blue"
            onClick={() => router.push('/user/become-instructor')}
            shape="round"
            icon={<TeamOutlined />}
            className="mr-8"
          >
            Become an Instructor
          </Button>
        )}

        {user && (
          <Button danger onClick={logout} type="round">
            Logout
          </Button>
        )}
      </div>
    </Menu>
  );
};

const TopNav = () => {
  return (
    <div className="sticky  top-0 z-50">
      <div className="p-4 bg-white sm:hidden">
        <Dropdown
          arrow={{ pointAtCenter: true }}
          overlay={
            <TopMenu
              menustyles="w-screen"
              rightmenustyles="flex flex-row justify-between m-2"
            />
          }
          trigger={['click']}
        >
          <Space>
            <MenuOutlined className="text-lg" />
          </Space>
        </Dropdown>
      </div>
      <div className="hidden sm:block">
        <TopMenu
          mode={'horizontal'}
          menustyles="flex items-center font-medium "
          rightmenustyles="absolute flex flex-row right-2"
        />
      </div>
    </div>
  );
};

export default TopNav;
