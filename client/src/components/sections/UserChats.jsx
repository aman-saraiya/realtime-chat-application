import React from "react";
import ChatsHeader from "../navbar/ChatsHeader";
import Search from "../forms/Search";
import ChatsList from "../chat/ChatsList";

const UserChats = () => {
  return (
    <>
      <ChatsHeader />
      <Search />
      <ChatsList />
    </>
  );
};

export default UserChats;
