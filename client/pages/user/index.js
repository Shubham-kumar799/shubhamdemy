//components
import SideNav from '../../components/SideNav';
import BaseLayout from '../../components/ui/BaseLayout';

//utils
import { useContext } from 'react';
import { Context } from '../../context';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <BaseLayout nostyles>
      <SideNav>yo</SideNav>
    </BaseLayout>
  );
};

export default UserIndex;
