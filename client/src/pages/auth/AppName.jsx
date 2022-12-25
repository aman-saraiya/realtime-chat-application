import React from "react";
const app_name = require("../../constants/app-name.png");
const AppName = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ marginBottom: "1.5rem" }}
    >
      <img
        src={app_name}
        style={{
          width: "50%",
          height: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default AppName;
