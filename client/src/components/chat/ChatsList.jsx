import { notification } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { List } from "react-virtualized";
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
    <div className="chats_users_list" style={{ border: "1px solid green" }}>
      {/* <List 
        width={300}
        height={300}
        rowCount={list.length}
        rowHeight={20}
        rowRenderer={rowRenderer}
      /> */}
      {chats &&
        chats.map((chat) => (
          <div
            className="chat_user_card row m-0"
            style={{
              border:
                !notifications ||
                (notifications && notifications.indexOf(chat._id) == -1)
                  ? "3px solid red"
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
