import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ChatsState } from "../context/ChatsProvider";
import { Button } from "antd";
import ProfileModal from "../modal/ProfileModal";
import GroupModal from "../modal/GroupModal";
const MessageHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isScreenSmall, selectedChat, setSelectedChat } = ChatsState();
  const handleBackClick = () => {
    setSelectedChat();
  };
  return (
    <div
      className="row m-0 p-0"
      style={{ height: "8%", border: "1px solid red" }}
    >
      <button
        className="border-0 m-0 p-0"
        style={{ width: "4%", display: isScreenSmall ? "" : "none" }}
        onClick={handleBackClick}
      >
        <ArrowLeftOutlined style={{ fontSize: "20px" }} />
      </button>
      <h2 className="col m-0 p-0">{selectedChat.chatName}</h2>
      <Button
        className="btn col-2 m-0 p-0"
        onClick={() => setIsModalOpen(true)}
      >
        {selectedChat.isGroupChat ? "View Group" : "View User"}
      </Button>
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
