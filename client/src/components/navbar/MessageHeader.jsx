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
  const chatWithUser = selectedChat.isGroupChat
    ? ""
    : selectedChat.users[0]._id === user._id
    ? selectedChat.users[1]
    : selectedChat.users[0];
  const chatPicture = selectedChat.isGroupChat
    ? selectedChat.groupPicture
    : chatWithUser.profilePicture;
  return (
    <div
      className={`d-flex flex-row m-0 p-0 ${
        darkMode ? "dark_mode_header" : "light_mode_header"
      }`}
    >
      <button
        className="border-0 m-0 p-0 send_button"
        style={{
          width: "1.5rem",
          height: "2.5rem",
          display: isScreenSmall ? "" : "none",
          border: "1px solid red",
        }}
        onClick={handleBackClick}
      >
        <ArrowLeftOutlined />
      </button>
      <div
        className="p-0 m-0 d-flex align-items-center"
        // style={{ border: "3px solid green" }}
      >
        <img src={chatPicture} className="profile_image" />
      </div>
      <div className="m-0 p-1 d-flex align-items-center flex-grow-1">
        {selectedChat.isGroupChat ? selectedChat.chatName : chatWithUser.name}
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ fontSize: "0.8rem", paddingRight: "0.5rem" }}
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
