import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
const MessageHeader = () => {
  return (
    <div
      className="row m-0 p-0"
      style={{ height: "8%", border: "1px solid red" }}
    >
      <button className="border-0 m-0 p-0" style={{ width: "4%" }}>
        <ArrowLeftOutlined style={{ fontSize: "20px" }} />
      </button>
      <h2 className="col m-0 p-0">Message Header</h2>
    </div>
  );
};

export default MessageHeader;
