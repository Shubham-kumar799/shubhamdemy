import Link from "next/link";
import { Button } from "antd";

const NewNav = () => {
  return (
    <div className="flex justify-between items-center border-black border-b-2">
      <div className="flex p-0 m-0">
        <div className="pl-2 pr-2">
          <Link href="/">
            <a className="text-black font-medium hover:border-blue-500 hover:border-b-2">
              Home
            </a>
          </Link>
        </div>
        <div className="ml-2 mr-2">
          <Link href="/">
            <a className="text-black font-medium">Home</a>
          </Link>
        </div>
        <div className="ml-2 mr-2">
          <Link href="/">
            <a className="text-black font-medium">Home</a>
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="ml-2 mr-2">
          <Link href="/">
            <a className="text-black font-medium">Logut</a>
          </Link>
        </div>
        <div className="ml-2 mr-2">
          <Button>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default NewNav;
