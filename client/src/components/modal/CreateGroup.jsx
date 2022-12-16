import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { createGroupChat } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";
import { AutoComplete } from "antd";
import { fetchUsers } from "../../utils/user";
import { AutoSizer, List } from "react-virtualized";
import UserCardModal from "../user/UserCardModal";
import { json } from "react-router-dom";
const user = JSON.parse(window.localStorage.getItem("user"));
const CreateGroup = ({
  isCreateGroupModalOpen,
  setIsCreateGroupModalOpen,
  setFetchChatsAgain,
  socket,
}) => {
  const { setSelectedChat } = ChatsState();
  const [groupName, setGroupName] = useState("");
  const [groupPicture, setGroupPicture] = useState("");
  const [groupUsers, setGroupUsers] = useState([]);
  const handleGroupNameInput = (event) => {
    setGroupName(event.target.value);
  };
  const handleGroupPictureInput = (event) => {};
  const handleCreateGroup = async () => {
    const groupUserIds = groupUsers.map(
      (groupUser) => JSON.parse(groupUser)._id
    );
    const response = await createGroupChat(groupUserIds, groupName, user._id);
    setSelectedChat(response.data);
    socket.emit("new group", response.data);
    setFetchChatsAgain((prevState) => !prevState);
    setIsCreateGroupModalOpen(false);
    setGroupName("");
    setGroupUsers([]);
  };
  const exitCreateGroupModal = () => {
    setIsCreateGroupModalOpen(false);
    setGroupName("");
    setGroupUsers([]);
  };
  const [options, setOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
          label: retrievedUsers[i].name,
          value: JSON.stringify(retrievedUsers[i]),
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
    if (groupUsers.indexOf(option.id) == -1) {
      setGroupUsers((prevState) => [...prevState, value]);
    }
    setSearchInput("");
  };
  const rowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        {groupUsers[index]}
      </div>
    );
  };
  return (
    <>
      <Modal
        title="New Group"
        open={isCreateGroupModalOpen}
        onOk={handleCreateGroup}
        onCancel={exitCreateGroupModal}
        width="20rem"
        bodyStyle={{ height: "16rem" }}
        okButtonProps={{
          style: {
            backgroundColor: "#19bd06",
          },
        }}
      >
        <div className="text-center">
          <img
            src={user.profilePicture}
            style={{
              height: "4rem",
              width: "4rem",
              borderRadius: "2rem",
              margin: "1rem",
            }}
          />
        </div>
        <form>
          <div className="form-group" style={{ fontSize: "0.8rem" }}>
            <input
              type="text"
              className="form-control"
              name="groupName"
              value={groupName}
              onChange={handleGroupNameInput}
              placeholder="Group Name"
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.8rem",
                lineHeight: "1rem",
                borderRadius: "0",
              }}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              name="groupPicture"
              onChange={handleGroupPictureInput}
              style={{
                marginBottom: "0.5rem",
                fontSize: "0.8rem",
                lineHeight: "1rem",
                borderRadius: "0",
              }}
            />
          </div>
          <AutoComplete
            style={{
              width: "100%",
              height: "1rem",
            }}
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
                placeholder="Search Users to Add"
              />
            }
            className="form-group"
            options={options}
            value={searchInput}
            onChange={handleSearchInput}
            onSelect={(value, option) => handleUserSelection(value, option)}
          />
          {/* {JSON.stringify(groupUsers)} */}
        </form>
        <div style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
          Participants:
        </div>
        <div
          style={{
            width: "100%",
            maxHeight: "3rem",
            backgroundColor: "#19bd06",
            color: "#ffffff",
            overflowY: "scroll",
            marginTop: "0.5rem",
            padding: "0",
            margin: "0",
          }}
        >
          <UserCardModal isAdmin={true} user={user} />
          {groupUsers &&
            groupUsers.map((user) => (
              <UserCardModal
                key={JSON.parse(user)._id}
                isAdmin={false}
                setGroupUsers={setGroupUsers}
                groupUsers={groupUsers}
                user={JSON.parse(user)}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export default CreateGroup;
