import React from "react";
import { Modal } from "antd";
const GroupModal = ({ isGroupModalOpen, setIsGroupModalOpen }) => {
  return (
    <Modal
      title="Group Details"
      open={isGroupModalOpen}
      onCancel={() => setIsGroupModalOpen(false)}
      footer={[]}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default GroupModal;
