import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Image, Dropdown, Button, Modal } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { ChatsState } from "../context/ChatsProvider";
import CreateGroup from "../modal/CreateGroup";
import ProfileModal from "../modal/ProfileModal";
const ChatsHeader = ({ setFetchChatsAgain, socket }) => {
  const navigate = useNavigate();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { darkMode } = ChatsState();
  const logout = async () => {
    await signOut(auth);
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(window.localStorage.getItem("user"));
  const items = [
    {
      label: <div onClick={() => setIsProfileModalOpen(true)}>My Account</div>,
      key: "my-account",
    }, // remember to pass the key prop
    { label: <div onClick={logout}>Sign Out</div>, key: "sign-out" },
  ];
  return (
    <div
      className={`row p-0 m-0 ${
        darkMode ? "dark_mode_header" : "light_mode_header"
      }`}
      style={{ height: "8%" }}
    >
      <div
        className="col-1 p-0 m-0 d-flex align-items-center"
        style={{ border: "3px solid green" }}
      >
        <img src={user.profilePicture} className="profile_image" />
      </div>
      <div className="col d-flex align-items-center">{user.name}</div>
      <div
        className={`col-1 p-0 m-0 float-end d-flex align-items-center justify-content-center ${
          darkMode ? "dark_header_button" : "light_header_button"
        }`}
        style={{ border: "1px solid red" }}
      >
        <UsergroupAddOutlined onClick={() => setIsCreateGroupModalOpen(true)} />
      </div>
      <CreateGroup
        isCreateGroupModalOpen={isCreateGroupModalOpen}
        setIsCreateGroupModalOpen={setIsCreateGroupModalOpen}
        setFetchChatsAgain={setFetchChatsAgain}
        socket={socket}
      />
      <ProfileModal
        isMyAccountView={true}
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
      />
      <div
        className="p-0 m-0 float-end d-flex align-items-center justify-content-center"
        style={{ border: "1px solid red", width: "1rem" }}
      >
        <Dropdown placement="bottomRight" trigger="click" menu={{ items }}>
          <a
            className={`d-flex align-items-center justify-content-center ${
              darkMode ? "dark_header_button" : "light_header_button"
            }`}
            style={{ width: "100%" }}
          >
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default ChatsHeader;
