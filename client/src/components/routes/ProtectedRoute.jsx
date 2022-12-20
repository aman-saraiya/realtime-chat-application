import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { UserState } from "../context/UserProvider";

const ProtectedRoute = ({ children }) => {
  //const user = JSON.parse(window.localStorage.getItem("user"));
  const { user } = UserState();
  return user && user.token ? children : <LoadingToRedirect />;
};

export default ProtectedRoute;
