import React from "react";

const chat_app = require("../../assets/chat_app.png");
const app_name = require("../../assets/app_name.png");
const cartoon = require("../../assets/image_chat.png");
const AppPreviewSection = () => {
  return (
    <div className="preview-section">
      <div
        className="d-flex flex-column flex-grow-1 m-0 p-0"
        style={{ height: "100%" }}
      >
        <div className="d-flex m-0 p-0" style={{ height: "10%" }}>
          <img
            src={app_name}
            style={{
              width: "15%",
              height: "80%",
              marginTop: "0.5rem",
              marginLeft: "0.5rem",
            }}
          />
        </div>
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{
            flex: 1,
            height: "90%",
            // border: "1px solid red",
            // marginLeft: "8%",
          }}
        >
          <img
            src={chat_app}
            style={{
              height: "60%",
              width: "70%",
              marginLeft: "auto",
              marginRight: "1rem",
            }}
          />
          <img src={cartoon} style={{ height: "40%", marginRight: "auto" }} />
        </div>
      </div>
    </div>
  );
};

export default AppPreviewSection;
