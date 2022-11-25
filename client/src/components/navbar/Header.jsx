import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { SettingOutlined, BellFilled, LogoutOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    window.localStorage.removeItem("user");
    navigate("/login");
  };
  return <></>;
};

export default Header;
