import { useState, useContext } from "react";
import axios from "axios";
import { Input } from "antd";
import EmailIcon from "@mui/icons-material/Email";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SyncOutlined,
} from "@ant-design/icons";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "antd";
import { toast } from "react-toastify";
import { Context } from "../context";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  console.log(state);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = {
        email,
        password,
      };
      const { data } = await axios.post(`/api/login`, {
        user,
      });
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
      toast("Login Successful");
    } catch (err) {
      toast.error(err.response.data);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-2/3 sm:w-2/5 md:w-1/3">
      <h1 className="text-xl mt-4">Welcome back...</h1>
      <div className="bg-black h-1"></div>
      <form onSubmit={handleSubmit} className="mt-4 mb-4">
        <div className="mt-4">
          <Input
            size="large"
            placeholder="email"
            prefix={<EmailIcon />}
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Input.Password
            placeholder="password"
            iconRender={visible =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            prefix={<LockIcon />}
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
          <div className="mt-4">
            <Button
              type="submit"
              block
              onClick={handleSubmit}
              disabled={!email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Sign in"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
