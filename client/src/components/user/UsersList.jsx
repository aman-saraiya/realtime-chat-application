import React from "react";
import { createOrFetchPersonalChat } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";
import UserCard from "./UserCard";

const UsersList = ({ users, setFetchChatsAgain, setIsSearching }) => {
  const { setSelectedChat } = ChatsState();
  const handleUserSelection = async (toUser) => {
    const response = await createOrFetchPersonalChat(toUser);
    const chatDetails = response.data;
    setSelectedChat(chatDetails);
    setIsSearching(false);
    setFetchChatsAgain((prevState) => !prevState);
  };
  return (
    <div className="chats_users_list" style={{ border: "1px solid green" }}>
      {users &&
        users.map((user) => (
          <div
            className="chat_user_card row m-0"
            key={user._id}
            onClick={() => {
              handleUserSelection(user._id);
            }}
          >
            <UserCard user={user} />
          </div>
        ))}
    </div>
  );
};

export default UsersList;
