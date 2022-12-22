import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 100);
  });
  return <div align="center">Redirecting to Login Page</div>;
};

export default LoadingToRedirect;
