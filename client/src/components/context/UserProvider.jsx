import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";
import { getCurrentUser } from "../../utils/user";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  console.log("UserProvider");
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const getCurrentUserFromFireBase = async (registeredUser) => {
    window.localStorage.setItem("userLoading", "true");
    if (registeredUser) {
      const idTokenResult = await registeredUser.getIdTokenResult();
      getCurrentUser(idTokenResult.token)
        .then((res) => {
          setTimeout(() => {
            setUser({
              name: res.data.name,
              email: res.data.email,
              profilePicture: res.data.profilePicture,
              token: idTokenResult.token,
              _id: res.data._id,
            });
          }, 1000);
        })
        .catch((err) => {
          window.localStorage.setItem("userLoading", "false");
          console.log(err);
        });
    } else {
      window.localStorage.setItem("userLoading", "false");
    }
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (currentUser) => {
      window.localStorage.setItem("isAuthenticated", "false");
      console.log("auth state changed");
      console.log(currentUser);
      getCurrentUserFromFireBase(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <UserContext.Provider
      value={{ user, setUser, userLoading, setUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
