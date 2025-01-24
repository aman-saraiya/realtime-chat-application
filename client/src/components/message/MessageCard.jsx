import React from "react";

import { UserState } from "../context/UserProvider";

const MessageCard = ({ message, isGroupChat }) => {
  //const user = JSON.parse(window.localStorage.getItem("user"));
  const { user } = UserState();
  const isSelfMessage = message.sender._id === user._id;
  return (
    <div style={{ padding: "0.1rem" }}>
      <div
        className={`message_card ${
          isSelfMessage ? "self_message" : "other_message"
        }`}
      >
        {isGroupChat && !isSelfMessage && (
          <div className="message_sender">{message.sender.name}</div>
        )}

        <div style={{ lineHeight: "1rem" }}>{message.content}</div>
      </div>
    </div>
  );
};

export default MessageCard;
