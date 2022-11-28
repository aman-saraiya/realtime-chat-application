import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { createGroupChat } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";
import { AutoComplete } from "antd";
import { fetchUsers } from "../../utils/user";

const user = JSON.parse(window.localStorage.getItem("user"));
const CreateGroup = ({
  isCreateGroupModalOpen,
  setIsCreateGroupModalOpen,
  setFetchChatsAgain,
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
    const response = await createGroupChat(groupUsers, groupName, user._id);
    setSelectedChat(response.data);
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
          key: retrievedUsers[i]._id,
          value: <div>{retrievedUsers[i].name}</div>,
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
    if (groupUsers.indexOf(option.id) == -1) {
      setGroupUsers((prevState) => [...prevState, option.id]);
    }
    setSearchInput("");
  };

  return (
    <>
      <Modal
        title="New Group"
        open={isCreateGroupModalOpen}
        onOk={handleCreateGroup}
        onCancel={exitCreateGroupModal}
      >
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="groupName"
              value={groupName}
              onChange={handleGroupNameInput}
              placeholder="Group Name"
            />
          </div>
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
          {JSON.stringify(groupUsers)}
          <div className="form-group">
            <input
              type="file"
              className="form-control"
              name="groupPicture"
              onChange={handleGroupPictureInput}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateGroup;
