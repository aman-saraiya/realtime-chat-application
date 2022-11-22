import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BellFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
const Header = () => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    window.localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="d-flex">
      <span className="d-inline-flex align-items-center">Chat App</span>

      <Menu
        className="d-inline-flex"
        mode="horizontal"
        defaultSelectedKeys={["mail"]}
      >
        <Menu.Item key="notifications">
          <BellFilled />
        </Menu.Item>
        <Menu.SubMenu key="SubMenu" title={<SettingOutlined />}>
          <Menu.Item key="two">My Profile</Menu.Item>
          <Menu.Item key="three" onClick={logout} icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Header;
