import React, { useState } from "react";
import { useEffect } from "react";
import { ChatsState } from "../context/ChatsProvider";
import SendMessage from "../forms/SendMessage";
import MessageDisplay from "../message/MessageDisplay";
import MessageHeader from "../navbar/MessageHeader";

const MessageWindow = ({ setFetchChatsAgain, socket }) => {
  const { selectedChat } = ChatsState();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    {
      selectedChat && socket.emit("join chat", selectedChat._id);
    }
  }, [selectedChat]);
  return selectedChat ? (
    <>
      <MessageHeader />
      <MessageDisplay
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
      <SendMessage
        typing={typing}
        setTyping={setTyping}
        setFetchChatsAgain={setFetchChatsAgain}
        socket={socket}
        setMessages={setMessages}
      />
    </>
  ) : (
    <></>
  );
};

export default MessageWindow;
