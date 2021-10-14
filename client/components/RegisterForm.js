import { useState } from "react";

import axios from "axios";
import { Input } from "antd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SyncOutlined,
} from "@ant-design/icons";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "antd";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = {
        username,
        email,
        password,
      };
      const { data } = await axios.post(`/api/register`, {
        user,
      });

      toast("Registration Successful");
    } catch (err) {
      toast.error(err.response.data);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-2/3 sm:w-2/5 md:w-1/3">
      <h1 className="text-xl mt-4">Get Started Here...</h1>
      <div className="bg-black h-1"></div>
      <form onSubmit={handleSubmit} className="mt-4 mb-4">
        <div className="mt-4">
          <Input
            size="large"
            placeholder="username"
            prefix={<AccountCircleIcon />}
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>
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
              disabled={!username || !email || !password || loading}
            >
              {loading ? <SyncOutlined spin /> : "Sign up"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
