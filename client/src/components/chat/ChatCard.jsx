import React from "react";

import { UserState } from "../context/UserProvider";

const ChatCard = ({ chat, notifications }) => {
  //const user = JSON.parse(window.localStorage.getItem("user"));
  const { user } = UserState();
  const chatWithUser =
    chat.users[0]._id == user._id ? chat.users[1] : chat.users[0];
  const chatCardTitle = chat.isGroupChat ? chat.chatName : chatWithUser.name;
  const chatCardImage = chat.isGroupChat
    ? chat.groupPicture.url
    : chatWithUser.profilePicture.url;

  var notifCount = 0;
  for (var i = 0; i < notifications.length; i++) {
    if (notifications[i]._id === chat._id) {
      notifCount = notifications[i].count;
    }
  }

  return (
    <>
      <div className="p-0 m-0 d-flex align-items-center">
        <img src={chatCardImage} className="profile_image" />
      </div>
      <div className="p-2 d-flex justify-content-center flex-column flex-grow-1">
        <div
          className="row p-0 m-0"
          style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
        >
          {chatCardTitle}
        </div>
        {chat.latestMessage && (
          <div
            className="row p-0 m-0"
            style={{
              fontSize: "0.6rem",
              lineHeight: "0.8rem",
              display: "inline",
            }}
          >
            <span style={{ fontWeight: "bold", padding: 0, margin: 0 }}>
              {chatWithUser._id !== chat.latestMessage.sender._id
                ? "You"
                : chatWithUser.name}
            </span>
            {": "}
            {chat.latestMessage.content.slice(0, 60)}
          </div>
        )}
      </div>
      {notifCount ? (
        <div className="d-flex justify-content-center align-items-center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "0.4rem",
              padding: 0,
              height: "1rem",
              width: "1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#19bd06",
              color: "#ffffff",
              fontSize: "0.8rem",
            }}
          >
            {notifCount}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ChatCard;
