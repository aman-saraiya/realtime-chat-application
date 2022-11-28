import React, { useState, useEffect } from "react";
import ChatsHeader from "../navbar/ChatsHeader";
import Search from "../forms/Search";
import ChatsList from "../chat/ChatsList";
import UsersList from "../user/UsersList";

const UserChats = ({
  fetchChatsAgain,
  setFetchChatsAgain,
  socket,
  notifications,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    socket.on("added to new group", () => {
      setFetchChatsAgain((prevState) => !prevState);
    });
  });
  return (
    <>
      <ChatsHeader setFetchChatsAgain={setFetchChatsAgain} socket={socket} />
      <Search
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        setFetchChatsAgain={setFetchChatsAgain}
      />
      {!isSearching && (
        <ChatsList
          notifications={notifications}
          socket={socket}
          fetchChatsAgain={fetchChatsAgain}
        />
      )}
    </>
  );
};

export default UserChats;
