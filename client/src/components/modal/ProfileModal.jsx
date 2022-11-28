import React from "react";
import { Modal } from "antd";
const ProfileModal = ({ isProfileModalOpen, setIsProfileModalOpen }) => {
  return (
    <Modal
      title="User Details"
      open={isProfileModalOpen}
      onCancel={() => setIsProfileModalOpen(false)}
      footer={[]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ProfileModal;
