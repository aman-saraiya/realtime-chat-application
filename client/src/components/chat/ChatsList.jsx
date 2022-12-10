import { notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchChats } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";
import ChatCard from "./ChatCard";

const ChatsList = ({ fetchChatsAgain, socket, notifications }) => {
  const { setSelectedChat } = ChatsState();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    loadChats();
  }, [fetchChatsAgain]);
  const loadChats = async () => {
    const response = await fetchChats();
    setChats(response.data);
  };

  return (
    <div
      className="row p-0 m-0"
      style={{ border: "1px solid green", height: "87%" }}
    >
      {chats &&
        chats.map((chat) => (
          <div
            style={{
              border:
                !notifications ||
                (notifications && notifications.indexOf(chat._id) == -1)
                  ? "1px solid red"
                  : "3px solid green",
            }}
            key={chat._id}
            onClick={() => {
              setSelectedChat((prevState) => {
                prevState && socket.emit("leave chat", prevState._id);
                return chat;
              });
            }}
          >
            <ChatCard chat={chat} />
          </div>
        ))}
    </div>
  );
};

export default ChatsList;
