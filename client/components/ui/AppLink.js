//components
import Link from 'next/link';

const AppLink = ({ title }) => {
  return (
    <Link href="/" className="hover:underline cursor-pointer">
      <a className="text-white text-md font-medium hover:underline hover:text-purple-900 w-max">
        {title}
      </a>
    </Link>
  );
};

export default AppLink;
