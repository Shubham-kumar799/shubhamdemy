import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { Context } from "../../context";

const CheckUser = ({ children }) => {
  const [ok, setOk] = useState(false);

  const router = useRouter();

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      if (data.ok) setOk(true);
    } catch (error) {
      console.log("Error fetching user", error);
      dispatch({
        type: "LOGOUT",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {ok ? (
        <>{children}</>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <SyncOutlined spin className="text-3xl" />
        </div>
      )}
    </>
  );
};

export default CheckUser;
