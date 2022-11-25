import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ChatsState } from "../context/ChatsProvider";
const MessageHeader = () => {
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
    </div>
  );
};

export default MessageHeader;
