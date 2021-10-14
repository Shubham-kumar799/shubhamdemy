import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logoblue from "../public/images/logo_blue.png";

import RegisterForm from "../components/RegisterForm";
import { Context } from "../context";
import router, { useRouter } from "next/router";

const Register = () => {
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <div className="flex flex-col items-center">
      <Image
        src={logoblue}
        alt="ShubhamDemy"
        height={125}
        width={175}
        // layout="responsive"
      />
      <RegisterForm />
      <div>
        Already have an account?
        <Link href="/login">
          <a className="ml-1 hover:underline">Sign in</a>
        </Link>
      </div>
    </div>
  );
};

export default Register;
