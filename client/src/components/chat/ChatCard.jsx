import React from "react";

const ChatCard = ({ chat }) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const chatWithUser =
    chat.users[0]._id == user._id ? chat.users[1] : chat.users[0];
  const chatCardTitle = chat.isGroupChat ? chat.chatName : chatWithUser.name;
  const chatCardImage = chat.isGroupChat
    ? chat.groupPicture
    : chatWithUser.profilePicture;
  return (
    <>
      <div className="p-0 m-0 d-flex align-items-center">
        <img src={chatCardImage} className="profile_image" />
      </div>
      <div className="p-2 d-flex justify-content-center flex-column">
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
    </>
  );
};

export default ChatCard;
