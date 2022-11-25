import React, { useEffect, useState } from "react";
import { ChatsState } from "../components/context/ChatsProvider";
import MessageWindow from "../components/sections/MessageWindow";
import UserChats from "../components/sections/UserChats";

const Chats = () => {
  const { selectedChat, isScreenSmall } = ChatsState();
  console.log(selectedChat, isScreenSmall);
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
          <UserChats />
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
          <MessageWindow isScreenSmall={isScreenSmall} />
        </div>
      </div>
    </div>
  );
};

export default Chats;
