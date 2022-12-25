import React, { useState, useRef } from "react";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { AutoSizer, List } from "react-virtualized";
import { fetchChats } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";
import { UserState } from "../context/UserProvider";
import ChatCard from "./ChatCard";

const ChatsList = ({ fetchChatsAgain, socket, notifications }) => {
  const { setSelectedChat, selectedChat } = ChatsState();
  const { user } = UserState();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    loadChats();
  }, [fetchChatsAgain]);
  const loadChats = async () => {
    const response = await fetchChats(user._id);
    setChats(response.data);
  };

  const rowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        <div
          className="chat_user_card d-flex m-0 p-0"
          style={{
            backgroundColor:
              selectedChat &&
              selectedChat._id === chats[index]._id &&
              "#e3fde3",
          }}
          key={chats[index]._id}
          onClick={() => {
            setSelectedChat((prevState) => {
              prevState && socket.emit("leave chat", prevState._id);
              return chats[index];
            });
          }}
        >
          <ChatCard notifications={notifications} chat={chats[index]} />
        </div>
      </div>
    );
  };
  return chats.length ? (
    <div className="chats_users_list">
      <AutoSizer>
        {({ width, height }) => (
          <List
            height={height}
            rowCount={chats.length}
            rowHeight={
              2.8 *
              parseFloat(getComputedStyle(document.documentElement).fontSize)
            }
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  ) : (
    <div
      className="chats_users_list d-flex align-items-center justify-content-center flex-column"
      style={{
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#676b68",
      }}
    >
      <div>Search users to start a chat</div>
      <div style={{ fontSize: "0.7rem" }}>or</div>
      <div
        style={{
          alignItems: "center",

          display: "flex",
        }}
      >
        Click{" "}
        <UsergroupAddOutlined
          style={{ marginLeft: "0.2rem", marginRight: "0.2rem" }}
        />{" "}
        to create a new group
      </div>
    </div>
  );
};

export default ChatsList;
