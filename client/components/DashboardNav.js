// NOT USED
//components
import { Menu } from 'antd';
import Link from 'next/link';

//utils
import { useState } from 'react';
import { useRouter } from 'next/router';

const { Item } = Menu;

const DashboardNav = () => {
  const [current, setCurrent] = useState('');
  const router = useRouter();

  return (
    <Menu className="items-center flex font-medium" selectedKeys={[current]}>
      <Item key="/user" onClick={e => setCurrent(e.key)}>
        <Link href="/user">
          <a>Dashboard</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default DashboardNav;
