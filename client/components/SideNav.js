//components
import { Layout, Menu } from 'antd';
import Link from 'next/link';

//utils
import { useState, useEffect, useContext } from 'react';
import { Context } from '../context';

//icons
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const { Content, Sider } = Layout;

const SideNav = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('3');
  const {
    state: { user },
  } = useContext(Context);

  const onCollapse = c => {
    setCollapsed(c);
  };

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Menu
          selectedKeys={[current]}
          theme="dark"
          defaultSelectedKeys={['3']}
          mode="inline"
        >
          <Menu.Item
            key="1"
            onClick={e => setCurrent(e.key)}
            icon={<UserOutlined />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={e => setCurrent(e.key)}
            icon={<DesktopOutlined />}
          >
            My Courses
          </Menu.Item>
          {user && user.role && user.role.includes('Instructor') && (
            <Menu.Item
              key="/instructor"
              onClick={e => setCurrent(e.key)}
              icon={<LocalLibraryIcon />}
            >
              <Link href="/instructor">
                <a>Instructor Dashboard</a>
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{ marginLeft: collapsed ? 80 : 200 }}
      >
        <Content style={{ margin: '0 16px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default SideNav;
