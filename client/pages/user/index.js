//components
import { SideNav } from '../../components/Nav';

//utils
import { useContext } from 'react';
import { Context } from '../../context';

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return <SideNav>yo</SideNav>;
};

export default UserIndex;
