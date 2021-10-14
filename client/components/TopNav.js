import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { Menu } from "antd";
import { Button } from "antd";
import { Context } from "../context";

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const { state, dispatch } = useContext(Context);
  const { user } = state;
  const router = useRouter();

  useEffect(() => {
    console.log(window.location.pathname);
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    window.localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  return (
    <Menu
      mode="horizontal"
      className="items-center flex  font-medium"
      selectedKeys={[current]}
    >
      <Item key="/" onClick={e => setCurrent(e.key)}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Item>

      {!user ? (
        <>
          <Item key="/login" onClick={e => setCurrent(e.key)}>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item key="/register" onClick={e => setCurrent(e.key)}>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      ) : (
        <>
          <Item key="/user" onClick={e => setCurrent(e.key)}>
            <Link href="/user">
              <a>Profile</a>
            </Link>
          </Item>
        </>
      )}
      <div className="absolute flex right-2">
        {user && (
          <Button onClick={logout} className="rounded-full">
            Logout
          </Button>
        )}
      </div>
    </Menu>
  );
};

export default TopNav;
