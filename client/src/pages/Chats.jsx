import React from "react";
import MessageWindow from "../components/sections/MessageWindow";
import UserChats from "../components/sections/UserChats";

const Chats = () => {
  return (
    <div
      className="container-fluid"
      style={{ height: "100%", border: "3px solid orange" }}
    >
      <div className="row" style={{ height: "100%" }}>
        <div
          className="col-12 col-lg-4 col-md-4 col-sm-12 p-0"
          style={{ border: "1px solid red", height: "100%" }}
        >
          <UserChats />
        </div>
        <div
          className="col-12 col-lg-8 col-md-8 col-sm-12 p-0"
          style={{ border: "1px solid red", height: "100%" }}
        >
          <MessageWindow />
        </div>
      </div>
    </div>
  );
};

export default Chats;
