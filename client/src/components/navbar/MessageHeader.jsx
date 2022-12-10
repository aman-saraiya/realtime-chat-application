import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ChatsState } from "../context/ChatsProvider";
import { Button } from "antd";
import ProfileModal from "../modal/ProfileModal";
import GroupModal from "../modal/GroupModal";
const MessageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isScreenSmall,
    selectedChat,
    setSelectedChat,
    darkMode,
  } = ChatsState();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const handleBackClick = () => {
    setSelectedChat();
  };
  const chatPicture = selectedChat.isGroupChat
    ? selectedChat.groupPicture
    : selectedChat.users[0] == user._id
    ? selectedChat.users[1].profilePicture
    : selectedChat.users[0].profilePicture;
  return (
    <div
      className={`row m-0 p-0 ${
        darkMode ? "dark_mode_header" : "light_mode_header"
      }`}
      style={{ border: "1px solid red" }}
    >
      <button
        className="border-0 m-0 p-0"
        style={{ width: "4%", display: isScreenSmall ? "" : "none" }}
        onClick={handleBackClick}
      >
        <ArrowLeftOutlined />
      </button>
      <div
        className="col-1 p-0 m-0 d-flex align-items-center justify-content-center"
        style={{ border: "3px solid green" }}
      >
        <img src={chatPicture} className="profile_image" />
      </div>
      <div className="col m-0 p-0 d-flex align-items-center">
        {selectedChat.chatName}
      </div>
      <div
        className="col-2 d-flex align-items-center float-end m-0 p-0 justify-content-center"
        style={{ fontSize: "0.8rem" }}
      >
        <div
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
          className={`${
            darkMode ? "dark_header_button" : "light_header_button"
          }`}
        >
          {selectedChat.isGroupChat ? "View Group" : "View User"}
        </div>
      </div>
      {selectedChat.isGroupChat ? (
        <GroupModal
          isGroupModalOpen={isModalOpen}
          setIsGroupModalOpen={setIsModalOpen}
        />
      ) : (
        <ProfileModal
          isMyAccountView={false}
          isProfileModalOpen={isModalOpen}
          setIsProfileModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default MessageHeader;
