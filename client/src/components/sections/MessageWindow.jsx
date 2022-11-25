import React, { useState } from "react";
import Search from "../forms/Search";
import SendMessage from "../forms/SendMessage";
import MessageDisplay from "../message/MessageDisplay";
import MessageHeader from "../navbar/MessageHeader";

const CurrentChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSendMessage = () => {};
  return (
    <>
      <MessageHeader />
      <MessageDisplay />
      <SendMessage />
    </>
  );
};

export default CurrentChat;
