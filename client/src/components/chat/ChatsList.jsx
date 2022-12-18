import React, { useState, useRef } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { AutoSizer, List } from "react-virtualized";
import { fetchChats } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";
import ChatCard from "./ChatCard";

const ChatsList = ({ fetchChatsAgain, socket, notifications }) => {
  const { setSelectedChat, selectedChat } = ChatsState();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    loadChats();
  }, [fetchChatsAgain]);
  const loadChats = async () => {
    const response = await fetchChats();
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
  return (
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
  );
};

export default ChatsList;
