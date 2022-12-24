import React from "react";
import { createOrFetchPersonalChat } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";
import { UserState } from "../context/UserProvider";
import UserCard from "./UserCard";

const UsersList = ({ users, setFetchChatsAgain, setIsSearching }) => {
  const { setSelectedChat } = ChatsState();
  const { user } = UserState();
  const handleUserSelection = async (toUser) => {
    const response = await createOrFetchPersonalChat(toUser, user._id);
    const chatDetails = response.data;
    setSelectedChat(chatDetails);
    setIsSearching(false);
    setFetchChatsAgain((prevState) => !prevState);
  };
  return (
    <div className="chats_users_list">
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
