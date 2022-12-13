import React from "react";
import { ChatsState } from "../context/ChatsProvider";

const MessageCard = ({ message }) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const isSelfMessage = message.sender._id === user._id;
  return (
    <div style={{ padding: "0.1rem" }}>
      <div className={`message_card ${isSelfMessage ? "self_message" : ""}`}>
        {message.content}
      </div>
    </div>
  );
};

export default MessageCard;
