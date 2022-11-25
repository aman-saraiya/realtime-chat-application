import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { SettingOutlined, BellFilled, LogoutOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
const ChatsHeader = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    window.localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="row p-0 m-0" style={{ height: "8%" }}>
      <h2 className="p-0 m-0" style={{ border: "1px solid red" }}>
        Chat Header
      </h2>
    </div>
  );
};

export default ChatsHeader;
