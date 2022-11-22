import React from "react";
import CurrentChat from "../components/chats/CurrentChat";
import UserChats from "../components/chats/UserChats";
import Header from "../components/navbar/Header";

const Chats = () => {
  return (
    <div className="flex">
      <Header />
      <UserChats />
      <CurrentChat />
    </div>
  );
};

export default Chats;
