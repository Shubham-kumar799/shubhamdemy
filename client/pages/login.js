//components
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';

//utils
import { useContext, useEffect } from 'react';
import { Context } from '../context';
import logoblue from '../public/images/logo_blue.png';
import { useRouter } from 'next/router';

const Login = () => {
  const { state } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <Image src={logoblue} alt="ShubhamDemy" height={125} width={175} />
      <LoginForm />
      <div>
        Don't have an account?
        <Link href="/register">
          <a className="ml-1 text-blue-600 hover:underline">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
