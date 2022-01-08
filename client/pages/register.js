//components
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '../components/RegisterForm';

//utils
import logoblue from '../public/images/logo_blue.png';
import { useContext, useEffect } from 'react';
import { Context } from '../context';
import router from 'next/router';

const Register = () => {
  const { state } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <Image src={logoblue} alt="ShubhamDemy" height={125} width={175} />
      <RegisterForm />
      <div>
        Already have an account?
        <Link href="/login">
          <a className="ml-1 hover:underline text-blue-600">Sign in</a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
