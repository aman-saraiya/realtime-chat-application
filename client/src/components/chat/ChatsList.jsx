import React, { useState, useRef } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { AutoSizer, List } from "react-virtualized";
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

  const list_space_ref = useRef(null);
  useLayoutEffect(() => {
    console.log(list_space_ref.current.clientHeight);
  }, [list_space_ref]);

  const rowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        <div
          className="chat_user_card d-flex m-0 p-0"
          style={{
            border:
              !notifications ||
              (notifications && notifications.indexOf(chats[index]._id) == -1)
                ? "3px solid red"
                : "3px solid green",
          }}
          key={chats[index]._id}
          onClick={() => {
            setSelectedChat((prevState) => {
              prevState && socket.emit("leave chat", prevState._id);
              return chats[index];
            });
          }}
        >
          <ChatCard chat={chats[index]} />
        </div>
      </div>
    );
  };
  return (
    <div
      className="chats_users_list"
      ref={list_space_ref}
      style={{ border: "1px solid green" }}
    >
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
      {/* {chats &&
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
        ))} */}
    </div>
  );
};

export default ChatsList;
