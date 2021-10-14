import CheckUser from "../../components/wrappers/CheckUser";
import UserInfoTemplate from "../../components/UserInfoTemplate";

const UserIndex = () => {
  return (
    <CheckUser>
      <div className="flex items-center justify-center">
        <UserInfoTemplate />
      </div>
    </CheckUser>
  );
};

export default UserIndex;
