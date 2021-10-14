import { useContext, useEffect } from "react";
import { Context } from "../context";
import Image from "next/image";
import Link from "next/link";
import logoblue from "../public/images/logo_blue.png";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";

const Register = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <Image src={logoblue} alt="ShubhamDemy" height={125} width={175} />
      <LoginForm />
      <div>
        New User?
        <Link href="/register">
          <a className="ml-1 hover:underline">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
