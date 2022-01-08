//components
import { Tabs } from 'antd';
import CheckUser from './wrappers/CheckUser';
import UserInfoTemplate from './UserInfoTemplate';

const { TabPane } = Tabs;

const UserDashboard = () => {
  return (
    <CheckUser>
      <Tabs className="" tabPosition={'left'}>
        <TabPane tab="Dashboard" key="1">
          <UserInfoTemplate />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </CheckUser>
  );
};

export default UserDashboard;
