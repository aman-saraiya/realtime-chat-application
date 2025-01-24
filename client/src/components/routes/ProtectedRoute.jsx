import React, { useEffect, useState } from "react";

import { UserState } from "../context/UserProvider";
import ChatsLoading from "./ChatsLoading";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();
  //const user = JSON.parse(window.localStorage.getItem("user"));
  const [userLoading, setUserLoading] = useState(
    window.localStorage.getItem("userLoading")
  );

  const { user } = UserState();
  useEffect(() => {
    if (user) {
      window.localStorage.setItem("userLoading", "false");
      setUserLoading(false);
      window.localStorage.setItem("isAuthenticated", "true");
    }
  }, [user]);

  if (userLoading === "true") {
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
