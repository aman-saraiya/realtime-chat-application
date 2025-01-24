import React, { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase";
import { getCurrentUser } from "../../utils/user";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getCurrentUserFromFireBase = async (registeredUser) => {
    window.localStorage.setItem("userLoading", "true");
    if (registeredUser) {
      const idTokenResult = await registeredUser.getIdTokenResult();
      // console.log(`Creating User ${registeredUser}`);
      getCurrentUser()
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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) await waitForUserCreating();
      if (currentUser && currentUser.displayName) {
        window.localStorage.setItem("isAuthenticated", "false");
        getCurrentUserFromFireBase(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  const waitForUserCreating = () => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        let userCreating = window.localStorage.getItem("userCreating");

        if (userCreating === "false") {
          clearInterval(interval); // Stop checking once it's falsy
          resolve(); // Resolve the promise, so further code can run
        }
      }, 100); // Check every 100ms
    });
  };
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
