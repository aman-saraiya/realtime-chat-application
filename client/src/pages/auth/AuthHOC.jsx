import React from "react";
import { HeartFilled } from "@ant-design/icons";
const AuthHOC = ({ children }) => {
  return (
    <>
      <div className="auth-HOC">{children}</div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ fontSize: "0.6rem", backgroundColor: "#e3fde3" }}
      >
        Made with{" "}
        <HeartFilled
          style={{
            color: "#19bd06",
            fontSize: "0.6rem",
            marginLeft: "0.3rem",
            marginRight: "0.3rem",
          }}
        />{" "}
        by{" "}
        <span
          style={{
            color: "#19bd06",
            marginLeft: "0.3rem",
            fontWeight: "bold",
          }}
        >
          {" "}
          Aman
        </span>
      </div>
    </>
  );
};

export default AuthHOC;
