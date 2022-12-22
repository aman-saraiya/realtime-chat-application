import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { auth } from "../../firebase";
import { createOrUpdateUser } from "../../utils/auth";
import { getCurrentUser } from "../../utils/user";
const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const getCurrentUserFromFireBase = async (registeredUser) => {
    window.localStorage.setItem("userLoading", "true");
    if (registeredUser) {
      const idTokenResult = await registeredUser.getIdTokenResult();
      getCurrentUser(idTokenResult.token)
        .then((res) => {
          setUser({
            name: res.data.name,
            email: res.data.email,
            profilePicture: res.data.profilePicture,
            token: idTokenResult.token,
            _id: res.data._id,
          });
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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
