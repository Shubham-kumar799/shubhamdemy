//components
import Image from 'next/image';

//utils
import { useContext } from 'react';
import { Context } from '../context';
import default_user_image from '../public/images/default_user_image.jpg';

const UserInfoTemplate = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <div className="flex flex-col items-center   p-8">
      <Image
        src={default_user_image}
        width={125}
        height={125}
        className="rounded-full"
      />
      <div className="flex flex-col items-start m-4 text-lg font-medium">
        <div>Username : {user?.username}</div>
        <div>email: {user?.email}</div>
      </div>
    </div>
  );
};

export default UserInfoTemplate;
