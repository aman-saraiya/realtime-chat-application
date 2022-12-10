import React from "react";
import { ChatsState } from "../context/ChatsProvider";

const MessageCard = ({ message }) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const { selectedChat } = ChatsState();
  return (
    <div
      className={`${message.sender._id == user._id &&
        "d-flex flex-row float-end"}`}
    >
      <div>
        {selectedChat.isGroupChat && message.sender._id !== user._id && (
          <div>{message.sender.name}</div>
        )}
      </div>
      <div>{message.content}</div>
    </div>
  );
};

export default MessageCard;
