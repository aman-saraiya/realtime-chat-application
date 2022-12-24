import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Image, Dropdown, Button, Modal } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { ChatsState } from "../context/ChatsProvider";
import CreateGroup from "../modal/CreateGroup";
import ProfileModal from "../modal/ProfileModal";
import { useLayoutEffect } from "react";
import { UserState } from "../context/UserProvider";

const ChatsHeader = ({ setFetchChatsAgain, socket }) => {
  const navigate = useNavigate();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const { darkMode } = ChatsState();
  const { user, setUser } = UserState();
  const logout = async () => {
    await signOut(auth);
    // window.localStorage.removeItem("user");
    socket.emit("terminate", user);
    setUser(null);
    navigate("/login");
    window.localStorage.setItem("isAuthenticated", "false");
  };

  //const user = JSON.parse(window.localStorage.getItem("user"));
  const items = [
    {
      label: <div onClick={() => setIsProfileModalOpen(true)}>My Account</div>,
      key: "my-account",
    }, // remember to pass the key prop
    { label: <div onClick={logout}>Sign Out</div>, key: "sign-out" },
  ];
  return (
    <div
      className={`d-flex flex-row p-0 m-0  ${
        darkMode ? "dark_mode_header" : "light_mode_header"
      }`}
    >
      <div className="p-0 m-0 d-flex align-items-center">
        <img src={user.profilePicture.url} className="profile_image" />
      </div>
      <div className="p-2 d-flex align-items-center flex-grow-1">
        {user.name}
      </div>
      <div
        className={`p-0 m-0 d-flex align-items-center ${
          darkMode ? "dark_header_button" : "light_header_button"
        }`}
      >
        <UsergroupAddOutlined onClick={() => setIsCreateGroupModalOpen(true)} />
      </div>
      <div
        className="p-0 m-0 d-flex  justify-content-center"
        style={{ width: "2rem" }}
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
    </div>
  );
};

export default ChatsHeader;
