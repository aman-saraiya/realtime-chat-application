import React, { useState } from "react";
import ChatsHeader from "../navbar/ChatsHeader";
import Search from "../forms/Search";
import ChatsList from "../chat/ChatsList";
import UsersList from "../user/UsersList";

const UserChats = ({ fetchChatsAgain, setFetchChatsAgain }) => {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <>
      <ChatsHeader />
      <Search
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setFetchChatsAgain={setFetchChatsAgain}
      />
      {!isSearching && <ChatsList fetchChatsAgain={fetchChatsAgain} />}
    </>
  );
};

export default UserChats;
