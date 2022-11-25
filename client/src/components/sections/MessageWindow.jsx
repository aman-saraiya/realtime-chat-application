import React, { useState } from "react";
import { ChatsState } from "../context/ChatsProvider";
import Search from "../forms/Search";
import SendMessage from "../forms/SendMessage";
import MessageDisplay from "../message/MessageDisplay";
import MessageHeader from "../navbar/MessageHeader";

const MessageWindow = ({}) => {
  const { selectedChat } = ChatsState();
  console.log(selectedChat);
  return selectedChat ? (
    <>
      <MessageHeader />
      <MessageDisplay />
      <SendMessage />
    </>
  ) : (
    <></>
  );
};

export default MessageWindow;
