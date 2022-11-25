import React, { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);
  const { selectedChat } = ChatsState();
  const loadMessages = async () => {
    const response = await fetchMessages(selectedChat._id);
    setMessages(response.data);
    console.log(messages);
  };
  useEffect(() => {
    loadMessages();
  }, [selectedChat]);
  return (
    <div
      className="row p-0 m-0"
      style={{ height: "84%", border: "1px solid green" }}
    >
      {messages &&
        messages.map((message) => (
          <div key={message._id}>
            {message.sender.name} - {message.content}
          </div>
        ))}
    </div>
  );
};

export default MessageDisplay;
