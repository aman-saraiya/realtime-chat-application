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
      <div className="row">
        <div
          className="col-1 p-0 m-0 d-flex align-items-center"
          style={{ border: "3px solid green" }}
        >
          <img src={chatCardImage} className="profile_image" />
        </div>
        <div className="col">{chatCardTitle}</div>
      </div>
      <div style={{ fontSize: "0.8rem" }}>
        {chatWithUser._id !== chat.latestMessage.sender._id
          ? "You"
          : chatWithUser.name}
        {": "}
        {chat.latestMessage.content.slice(0, 60)}
      </div>
    </>
  );
};

export default ChatCard;
