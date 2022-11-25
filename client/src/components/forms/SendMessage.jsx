import { SendOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const SendMessage = () => {
  const [messageContent, setMessageContent] = useState("");
  const handleInputChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleSendMessage = () => {};
  return (
    <div className="row p-0 m-0" style={{ height: "8%" }}>
      {/* <input style={{ width: "100%", border: "1px solid red" }} type="text" /> */}
      <div className="input-group p-0 m-0">
        <input
          style={{ width: "100%", border: "none" }}
          type="text"
          value={messageContent}
          onChange={handleInputChange}
        />
        <SendOutlined
          style={{ background: "white", fontSize: "25px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default SendMessage;
