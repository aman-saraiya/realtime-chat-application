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
import UserCardModal from "../user/UserCardModal";
import { UserState } from "../context/UserProvider";

const GroupModal = ({ isGroupModalOpen, setIsGroupModalOpen, socket }) => {
  const { selectedChat, setSelectedChat } = ChatsState();
  //const user = JSON.parse(window.localStorage.getItem("user"));
  const { user } = UserState();
  const isCurrentUserAdmin = user._id == selectedChat.groupAdmin._id;
  const [options, setOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [addUser, setAddUser] = useState();
  const [newGroupName, setNewGroupName] = useState("");

  const handleSearchInput = async (value) => {
    setSearchInput(value);
  };

  const loadUsers = async () => {
    const response = await fetchUsers(searchInput, user);
    const retrievedUsers = response.data;
    var optionsArray = [];
    if (retrievedUsers) {
      for (let i = 0; i < retrievedUsers.length; i++) {
        optionsArray.push({
          label: retrievedUsers[i].name,
          value: JSON.stringify(retrievedUsers[i]),
          id: retrievedUsers[i]._id,
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
    if (selectedChat.users.indexOf(option.id) == -1) {
      setAddUser(JSON.parse(value));
    }
    setSearchInput("");
  };

  const handleRemoveUser = async (removeUser) => {
    const response = await removeUserFromGroup(
      removeUser._id,
      user._id,
      selectedChat._id,
      user
    );
    const updatedChat = response.data;
    // console.log(updatedChat);
    setSelectedChat(updatedChat);
  };
  const handleAddUser = async () => {
    const response = await addUserToGroup(
      addUser._id,
      user._id,
      selectedChat._id,
      user
    );
    const updatedChat = response.data;
    socket.emit("new group", response.data);
    setSelectedChat(updatedChat);
    setAddUser();
  };
  const handleGroupModalClose = () => {
    setAddUser();
    setIsGroupModalOpen(false);
  };

  const handleRenameGroup = async () => {
    const response = await renameGroup(newGroupName, selectedChat._id, user);
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
      width="20rem"
      bodyStyle={{ height: isCurrentUserAdmin ? "21rem" : "18rem" }}
    >
      <div>
        <div className="text-center">
          <img
            src={selectedChat.groupPicture}
            style={{
              height: "4rem",
              width: "4rem",
              borderRadius: "2rem",
              margin: "1rem",
            }}
          />
          <div style={{ fontSize: "1rem" }}>{selectedChat.chatName}</div>
        </div>

        <div
          style={{
            fontSize: "0.8rem",
            marginBottom: "0.5rem",
            // backgroundColor: "#19bd06",
            // width: "fit-content",
            // paddingLeft: "0.1rem",
            // paddingRight: "0.1rem",
            // color: "#ffffff",
          }}
        >
          Admin: {selectedChat.groupAdmin.name}
        </div>

        <div className="d-flex m-0 p-0">
          <input
            type="text"
            className="form-control"
            name="newGroupName"
            value={newGroupName}
            onChange={(event) => setNewGroupName(event.target.value)}
            placeholder="New Group Name"
            style={{
              flex: 1,
              marginBottom: "0.5rem",
              fontSize: "0.8rem",
              lineHeight: "1rem",
              borderRadius: "0",
            }}
          />
          <button
            style={{
              marginLeft: "0.2rem",
              marginBottom: "0.5rem",
              backgroundColor: "#19bd06",
              color: "#ffffff",
              border: "none",
              fontSize: "0.6rem",
              width: "5rem",
            }}
            onClick={handleRenameGroup}
          >
            Rename Group
          </button>
        </div>

        {isCurrentUserAdmin && (
          <div style={{ marginBottom: "0.5rem" }}>
            <AutoComplete
              style={{
                width: "100%",
                height: "1.5rem",
                marginBottom: "0.5rem",
              }}
              options={options}
              value={searchInput}
              onChange={handleSearchInput}
              onSelect={(value, option) => handleUserSelection(value, option)}
              children={
                <input
                  className="form-control"
                  style={{
                    fontSize: "0.8rem",
                    lineHeight: "1rem",
                    borderRadius: "0",
                    border: "1px solid #bdbdbd",
                    outline: "none",
                  }}
                  placeholder="Search User to Add"
                />
              }
            />
            <div
              className="d-flex m-0 p-0"
              style={{ marginBottom: "0.5rem", height: "1.3390rem" }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  fontSize: "0.8rem",
                  height: "1rem",
                  borderRadius: "0",
                }}
              >
                Selected User: {addUser ? addUser.name : "None"}
              </div>
              <button
                disabled={!addUser}
                onClick={handleAddUser}
                style={{
                  marginLeft: "0.2rem",
                  backgroundColor: "#19bd06",
                  color: "#ffffff",
                  border: "none",
                  fontSize: "0.6rem",
                  width: "5rem",
                  paddingTop: "0.1875rem",
                  paddingBottom: "0.1534rem",
                }}
              >
                Add to Group
              </button>
            </div>
          </div>
        )}
        <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
          Participants:
        </div>
        <div
          style={{
            width: "100%",
            maxHeight: "4.8rem",
            backgroundColor: "#19bd06",
            color: "#ffffff",
            overflowY: "scroll",
            marginTop: "0.5rem",
            padding: "0",
            margin: "0",
          }}
        >
          {selectedChat.users.map((groupUser) => (
            <UserCardModal
              key={groupUser._id}
              isAdmin={groupUser._id === selectedChat.groupAdmin._id}
              isCurrentUserAdmin={isCurrentUserAdmin}
              user={groupUser}
              removeUserFromGroup={() => handleRemoveUser(groupUser)}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default GroupModal;
