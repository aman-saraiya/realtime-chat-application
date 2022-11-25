import React, { useState } from "react";
import { useEffect } from "react";
import { fetchChats } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";

const ChatsList = ({ fetchAgain }) => {
  const { setSelectedChat } = ChatsState();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    loadChats();
  }, [fetchAgain]);
  const loadChats = async () => {
    const response = await fetchChats();
    setChats(response.data);
    console.log(response.data);
  };
  return (
    <div
      className="row p-0 m-0"
      style={{ border: "1px solid green", height: "87%" }}
    >
      {/* <h2 className="p-0 m-0">ChatList</h2> */}
      {chats &&
        chats.map((chat) => (
          <div
            style={{ border: "1px solid red" }}
            key={chat._id}
            onClick={() => {
              console.log(chat);
              setSelectedChat(chat);
            }}
          >
            {chat.chatName}
          </div>
        ))}
    </div>
  );
};

export default ChatsList;
