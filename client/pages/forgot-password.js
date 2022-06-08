//components
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import Image from 'next/image';
import BaseLayout from '../components/ui/BaseLayout';

//utils
import { useContext, useEffect } from 'react';
import { Context } from '../context';
import { useRouter } from 'next/router';
import logoblue from '../public/images/logo_blue.png';

const ForgotPassword = () => {
  const {
    state: { user },
  } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/');
  }, [user]);

  return (
    <BaseLayout>
      <div className="flex flex-col items-center">
        <Image src={logoblue} alt="ShubhamDemy" height={125} width={175} />
        <ForgotPasswordForm />
      </div>
    </BaseLayout>
  );
};

export default ForgotPassword;
