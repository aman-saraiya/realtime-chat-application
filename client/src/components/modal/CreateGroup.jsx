import React, { useState } from "react";
import { Button, Modal } from "antd";
import { createGroupChat } from "../../utils/chat";
import { ChatsState } from "../context/ChatsProvider";

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
  const handleGroupPictureInput = (event) => {
    // setGroupName(event.target.value);
  };
  const handleCreateGroup = async () => {
    const response = await createGroupChat(groupUsers, groupName, user._id);
    // setSelectedChat(response.data);
    setFetchChatsAgain((prevState) => !prevState);
    setIsCreateGroupModalOpen(false);
  };
  const exitCreateGroupModal = () => {
    setIsCreateGroupModalOpen(false);
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
