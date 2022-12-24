import React, { useRef } from "react";
import { Modal } from "antd";
import { ChatsState } from "../context/ChatsProvider";
import { UserState } from "../context/UserProvider";
import { EditOutlined } from "@ant-design/icons";
import {
  deleteImage,
  fileUploadAndResize,
} from "../../utils/fileResizeAndUpload";
import { updateProfileImage } from "../../utils/user";
const ProfileModal = ({
  isProfileModalOpen,
  setIsProfileModalOpen,
  isMyAccountView,
}) => {
  const { selectedChat } = ChatsState();
  const userState = UserState();
  const currentUser = userState.user;
  const setUser = userState.setUser;
  // const currentUser = JSON.parse(window.localStorage.getItem("user"));
  if (selectedChat) {
    var otherUser =
      selectedChat.users[0]._id == currentUser._id
        ? selectedChat.users[1]
        : selectedChat.users[0];
  }
  const editRef = useRef();
  const user = isMyAccountView ? currentUser : otherUser;
  const onProfileEditClick = () => {
    // `current` points to the mounted file input element
    editRef.current.click();
  };
  const handleProfileImageUpdate = async (event) => {
    console.log(event.target.files[0]);
    try {
      const response = await fileUploadAndResize(event.target.files[0]);
      // console.log(response.data.url);
      // setGroupPicture(response.data.url);
      const updateResponse = await updateProfileImage({
        url: response.data.url,
        _id: response.data.public_id,
      });
      // console.log(updateResponse.data);
      const imageIdToBeDeleted = user.profilePicture._id;
      if (imageIdToBeDeleted != "default") {
        response = await deleteImage(imageIdToBeDeleted);
        console.log(response);
      }
      setUser((prevUserState) => ({
        name: updateResponse.data.name,
        email: updateResponse.data.email,
        profilePicture: updateResponse.data.profilePicture,
        token: prevUserState.token,
        _id: updateResponse.data._id,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title={isMyAccountView ? "My Account" : "User Details"}
      open={isProfileModalOpen}
      onCancel={() => setIsProfileModalOpen(false)}
      footer={[]}
      width="20rem"
    >
      <div>
        <div className="text-center">
          <div className="d-flex justify-content-center">
            <input
              type="file"
              ref={editRef}
              style={{ display: "none" }}
              onChange={handleProfileImageUpdate}
            />
            <img
              src={user.profilePicture.url}
              style={{
                height: "4rem",
                width: "4rem",
                borderRadius: "2rem",
                margin: "1rem",
                // marginBottom: isMyAccountView ? "0" : "1rem",
                marginRight: isMyAccountView ? "0" : "1rem",
              }}
            />
            {isMyAccountView && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: "1rem",
                }}
              >
                <EditOutlined onClick={onProfileEditClick} />
              </div>
            )}
          </div>
          <div style={{ fontSize: "1rem" }}>{user.name}</div>
          <div style={{ fontSize: "0.8rem" }}>{user.email}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
