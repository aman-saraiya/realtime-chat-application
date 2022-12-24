import React from "react";

const ChatsLoading = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <div className="loader"></div>
      <div style={{ margin: "1rem", color: "#19bd06" }}>
        Loading your chats ...
      </div>
    </div>
  );
};

export default ChatsLoading;
