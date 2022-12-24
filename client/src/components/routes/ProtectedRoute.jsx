import React from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import { UserState } from "../context/UserProvider";
import { useEffect } from "react";
import { useState } from "react";
import ChatsLoading from "./ChatsLoading";

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
    return <ChatsLoading />;
  } else {
    if (user) {
      return children;
    } else {
      return !window.localStorage.getItem("isAuthenticated") ||
        window.localStorage.getItem("isAuthenticated") === "false" ? (
        <LoadingToRedirect />
      ) : (
        <ChatsLoading />
      );
    }
  }
};

export default ProtectedRoute;
