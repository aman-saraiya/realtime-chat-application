import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  BellFilled,
  LogoutOutlined,
} from "@ant-design/icons";

const Header = () => {
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
          <Menu.Item key="three" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default Header;
