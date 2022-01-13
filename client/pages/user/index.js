//components
import SideNav from '../../components/SideNav';

//utils
import { useContext } from 'react';
import { Context } from '../../context';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return <SideNav></SideNav>;
};

export default UserIndex;
