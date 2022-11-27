import React from "react";
import { createOrFetchPersonalChat } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";

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
    <div
      className="row p-0 m-0"
      style={{ border: "1px solid green", height: "87%" }}
    >
      {users &&
        users.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              handleUserSelection(user._id);
            }}
          >
            {user.name}
          </div>
        ))}
    </div>
  );
};

export default UsersList;
