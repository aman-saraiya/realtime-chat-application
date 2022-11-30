import React, { useEffect, useState } from "react";
import { ChatsState } from "../components/context/ChatsProvider";
import MessageWindow from "../components/sections/MessageWindow";
import UserChats from "../components/sections/UserChats";

const Chats = ({ socket }) => {
  const { selectedChat, isScreenSmall } = ChatsState();
  const [fetchChatsAgain, setFetchChatsAgain] = useState(false);
  const [notifications, setNotifications] = useState([]);
  // console.log(selectedChat, isScreenSmall);
  return (
    <div
      className="container-fluid"
      style={{ height: "100%", border: "3px solid orange" }}
    >
      <div className="row" style={{ height: "100%" }}>
        <div
          className="col-12 col-lg-4 col-md-4 col-sm-12 p-0"
          style={{
            border: "1px solid red",
            height: "100%",
            display:
              (isScreenSmall && !selectedChat) || !isScreenSmall ? "" : "none",
          }}
        >
          <UserChats
            socket={socket}
            setFetchChatsAgain={setFetchChatsAgain}
            fetchChatsAgain={fetchChatsAgain}
            notifications={notifications}
          />
        </div>
        <div
          className="col-12 col-lg-8 col-md-8 col-sm-12 p-0"
          style={{
            border: "1px solid red",
            height: "100%",
            display:
              (isScreenSmall && selectedChat) || !isScreenSmall ? "" : "none",
          }}
        >
          {/* {JSON.stringify(notifications)} */}
          <MessageWindow
            socket={socket}
            setFetchChatsAgain={setFetchChatsAgain}
            isScreenSmall={isScreenSmall}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
