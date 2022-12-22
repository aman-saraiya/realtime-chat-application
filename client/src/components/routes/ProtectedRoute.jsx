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
    if (user) {
      window.localStorage.setItem("userLoading", "false");
      setUserLoading(false);
    }
  }, [user]);
  if (userLoading === "true") {
    return <div>Loading...</div>;
  } else {
    if (user) {
      return children;
    } else {
      return <LoadingToRedirect />;
    }
  }
};

export default ProtectedRoute;
