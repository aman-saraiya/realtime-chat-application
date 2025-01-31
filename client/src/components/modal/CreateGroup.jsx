import React, { useEffect, useState } from "react";

import { AutoComplete, Modal } from "antd";

import { createGroupChat } from "../../utils/chat";
import {
  deleteImage,
  fileUploadAndResize,
} from "../../utils/fileResizeAndUpload";
import { fetchUsers } from "../../utils/user";
import { ChatsState } from "../context/ChatsProvider";
import { UserState } from "../context/UserProvider";
import UserCardModal from "../user/UserCardModal";

const CreateGroup = ({
  isCreateGroupModalOpen,
  setIsCreateGroupModalOpen,
  setFetchChatsAgain,
  socket,
}) => {
  //const user = JSON.parse(window.localStorage.getItem("user"));
  const { user } = UserState();
  const { setSelectedChat } = ChatsState();
  const [groupName, setGroupName] = useState("");
  const [groupPicture, setGroupPicture] = useState({
    url:
      "https://res.cloudinary.com/dh94shztn/image/upload/v1671613414/MERN%20Chat%20App/groupIcon_zsoewt.png",
    _id: "default",
  });
  const [groupUsers, setGroupUsers] = useState([]);
  const handleGroupNameInput = (event) => {
    setGroupName(event.target.value);
  };
  const handleGroupPictureInput = async (event) => {
    // console.log(event.target.files[0]);
    try {
      var response = await fileUploadAndResize(event.target.files[0]);
      // console.log(response.data);
      const imageIdToBeDeleted = groupPicture._id;
      if (imageIdToBeDeleted != "default") {
        response = await deleteImage(imageIdToBeDeleted);
        console.log(response);
      }
      setGroupPicture({ url: response.data.url, _id: response.data.public_id });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateGroup = async () => {
    const groupUserIds = groupUsers.map(
      (groupUser) => JSON.parse(groupUser)._id
    );
    const response = await createGroupChat(
      groupUserIds,
      groupName,
      user._id,
      groupPicture
    );
    setSelectedChat(response.data);
    socket.emit("new group", response.data);
    setFetchChatsAgain((prevState) => !prevState);
    setIsCreateGroupModalOpen(false);
    setGroupName("");
    setGroupUsers([]);
    setGroupPicture({
      url:
        "https://res.cloudinary.com/dh94shztn/image/upload/v1671613414/MERN%20Chat%20App/groupIcon_zsoewt.png",
      _id: "default",
    });
  };
  const exitCreateGroupModal = async () => {
    setIsCreateGroupModalOpen(false);
    setGroupName("");
    setGroupUsers([]);
    const imageIdToBeDeleted = groupPicture._id;
    if (imageIdToBeDeleted != "default") {
      const response = await deleteImage(imageIdToBeDeleted);
      console.log(response);
    }
    setGroupPicture({
      url:
        "https://res.cloudinary.com/dh94shztn/image/upload/v1671613414/MERN%20Chat%20App/groupIcon_zsoewt.png",
      _id: "default",
    });
  };
  const [options, setOptions] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = async (value) => {
    setSearchInput(value);
  };

  const loadUsers = async () => {
    const response = await fetchUsers(searchInput, user._id);
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
    if (groupUsers.indexOf(value) == -1) {
      setGroupUsers((prevState) => [...prevState, value]);
    }
    setSearchInput("");
  };

  const removeUserFromGroup = (removeUser) => {
    setGroupUsers((prevState) =>
      prevState.filter(
        (groupUser) => JSON.parse(groupUser)._id != removeUser._id
      )
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
        bodyStyle={{ height: "18rem" }}
        okButtonProps={{
          style: {
            backgroundColor: "#19bd06",
            borderRadius: 0,
          },
          type: "primary",
        }}
        cancelButtonProps={{
          style: {
            borderRadius: 0,
            backgroundColor: "#bdbdbd",
          },
          type: "text",
        }}
        okText="Create"
      >
        <div className="text-center">
          <img
            src={groupPicture.url}
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
            maxHeight: "4.8rem",
            backgroundColor: "#19bd06",
            color: "#ffffff",
            overflowY: "scroll",
            marginTop: "0.5rem",
            padding: "0",
            margin: "0",
          }}
        >
          <UserCardModal isAdmin={true} user={user} isCurrentUserAdmin={true} />
          {groupUsers &&
            groupUsers.map((groupUser) => (
              <UserCardModal
                key={JSON.parse(groupUser)._id}
                isAdmin={false}
                isCurrentUserAdmin={true}
                removeUserFromGroup={() =>
                  removeUserFromGroup(JSON.parse(groupUser))
                }
                user={JSON.parse(groupUser)}
              />
            ))}
        </div>
      </Modal>
    </>
  );
};

export default CreateGroup;
