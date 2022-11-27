import React, { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";

const MessageDisplay = ({ socket, messages, setMessages }) => {
  const [isTyping, setIsTyping] = useState(false);

  const { selectedChat } = ChatsState();
  const loadMessages = async () => {
    const response = await fetchMessages(selectedChat._id);
    setMessages(response.data);
  };
  useEffect(() => {
    loadMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("MESSAGE RECEIVED");
      console.log(newMessageReceived);
      if (selectedChat && newMessageReceived.chat._id == selectedChat._id) {
        setMessages((prevState) => [...prevState, newMessageReceived]);
      } else {
      }
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

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
      <div>{isTyping && "Typing"}</div>
    </div>
  );
};

export default MessageDisplay;
