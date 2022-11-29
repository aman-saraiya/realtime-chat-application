import React from "react";
import { Modal } from "antd";
import { ChatsState } from "../context/ChatsProvider";
const ProfileModal = ({
  isProfileModalOpen,
  setIsProfileModalOpen,
  isMyAccountView,
}) => {
  const { selectedChat } = ChatsState();
  const currentUser = JSON.parse(window.localStorage.getItem("user"));

  if (selectedChat) {
    var otherUser =
      selectedChat.users[0]._id == currentUser._id
        ? selectedChat.users[1]
        : selectedChat.users[0];
  }
  const user = isMyAccountView ? currentUser : otherUser;
  return (
    <Modal
      title={isMyAccountView ? "My Account" : "User Details"}
      open={isProfileModalOpen}
      onCancel={() => setIsProfileModalOpen(false)}
      footer={[]}
    >
      <div>
        <div className="text-center">
          <img
            src={user.profilePicture}
            style={{
              height: "20%",
              width: "20%",
              borderRadius: "50%",
              margin: "1rem",
            }}
          />
          <h4>{user.name}</h4>
          <h6>{user.email}</h6>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
