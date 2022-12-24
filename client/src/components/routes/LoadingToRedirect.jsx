import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 1000);
  });
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100%" }}
    >
      <div className="loader"></div>
      <div style={{ margin: "1rem", color: "#19bd06" }}>
        Redirecting to Login Page ...
      </div>
    </div>
  );
};

export default LoadingToRedirect;
