import React, { useState, useEffect } from "react";
import { Modal, AutoComplete } from "antd";
import { ChatsState } from "../context/ChatsProvider";
import UserChicklet from "./UserChicklet";
import {
  removeUserFromGroup,
  addUserToGroup,
  renameGroup,
} from "../../utils/chat";
import { fetchUsers } from "../../utils/user";

const GroupModal = ({ isGroupModalOpen, setIsGroupModalOpen }) => {
  const { selectedChat, setSelectedChat } = ChatsState();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const isAdmin = user._id == selectedChat.groupAdmin._id;
  const [options, setOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [addUser, setAddUser] = useState();
  const [newGroupName, setNewGroupName] = useState("");
  const handleSearchInput = async (value) => {
    setSearchInput(value);
  };

  const loadUsers = async () => {
    const response = await fetchUsers(searchInput);
    const retrievedUsers = response.data;
    var optionsArray = [];
    if (retrievedUsers) {
      for (let i = 0; i < retrievedUsers.length; i++) {
        optionsArray.push({
          key: retrievedUsers[i]._id,
          value: <div>{retrievedUsers[i].name}</div>,
          _id: retrievedUsers[i]._id,
        });
      }
    }
    setOptions(optionsArray);
    // console.log(optionsArray);
  };
  useEffect(() => {
    loadUsers();
  }, [searchInput]);

  const handleUserSelection = (value, option) => {
    if (selectedChat.users.indexOf(option._id) == -1) {
      setAddUser(option._id);
    }
    setSearchInput("");
  };

  const handleRemoveUser = async (removeUser) => {
    const response = await removeUserFromGroup(
      removeUser._id,
      user._id,
      selectedChat._id
    );
    const updatedChat = response.data;
    // console.log(updatedChat);
    setSelectedChat(updatedChat);
  };
  const handleAddUser = async () => {
    const response = await addUserToGroup(addUser, user._id, selectedChat._id);
    const updatedChat = response.data;
    setSelectedChat(updatedChat);
    setAddUser();
  };
  const handleGroupModalClose = () => {
    setAddUser();
    setIsGroupModalOpen(false);
  };

  const handleRenameGroup = async () => {
    const response = await renameGroup(newGroupName, selectedChat._id);
    const updatedChat = response.data;
    setSelectedChat(updatedChat);
    setNewGroupName("");
  };

  return (
    <Modal
      title="Group Details"
      open={isGroupModalOpen}
      onCancel={handleGroupModalClose}
      footer={[]}
    >
      <div>
        <div className="text-center">
          <img
            src={selectedChat.groupPicture}
            style={{
              height: "20%",
              width: "20%",
              borderRadius: "50%",
              margin: "1rem",
            }}
          />
          <h4>{selectedChat.chatName}</h4>
          <input
            value={newGroupName}
            onChange={(event) => setNewGroupName(event.target.value)}
          />
          <button onClick={handleRenameGroup}>Rename Group</button>
          <h6>{selectedChat.groupAdmin.name}</h6>
          <AutoComplete
            style={{
              width: 200,
            }}
            options={options}
            value={searchInput}
            onChange={handleSearchInput}
            onSelect={(value, option) => handleUserSelection(value, option)}
            placeholder="Search Users to Add"
          />
          <button disabled={!addUser} onClick={handleAddUser}>
            Click to Add User to Group
          </button>
          <div>{addUser}</div>
          <div className="d-flex flex-wrap">
            {selectedChat.users.map((user) => (
              <UserChicklet
                key={user._id}
                name={user.name}
                isAdmin={isAdmin}
                onRemove={() => handleRemoveUser(user)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GroupModal;
