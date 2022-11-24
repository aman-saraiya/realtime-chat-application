import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  return user && user.token ? children : <LoadingToRedirect />;
};

export default ProtectedRoute;
