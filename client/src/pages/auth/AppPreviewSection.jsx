import React from "react";

const chat_app = require("../../constants/Chat-app.png");
const app_name = require("../../constants/app-name.png");
const cartoon = require("../../constants/Image_Chat.png");
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
          className="d-flex flex-column align-items-center flex-column justify-content-center"
          style={{
            flex: 1,
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
