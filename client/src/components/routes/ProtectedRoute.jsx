import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { UserState } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();
  //const user = JSON.parse(window.localStorage.getItem("user"));
  console.log("Protected Route");
  const [userLoading, setUserLoading] = useState(
    window.localStorage.getItem("userLoading")
  );

  const { user } = UserState();
  useEffect(() => {
    console.log("User State Changed");
    console.log(user);
    if (user) {
      window.localStorage.setItem("userLoading", "false");
      setUserLoading(false);
      window.localStorage.setItem("isAuthenticated", "true");
    }
  }, [user]);
  if (userLoading === "true") {
    console.log("userLoading here");
    return <div>Loading...</div>;
  } else {
    if (user) {
      return children;
    } else {
      return window.localStorage.getItem("isAuthenticated") === "false" ? (
        <LoadingToRedirect />
      ) : null;
    }
  }
};

export default ProtectedRoute;
