import React, { useContext, useState, createContext, useEffect } from "react";

const ChatsContext = createContext();

const ChatsProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const updateScreenSize = () => {
    setIsScreenSmall(window.innerWidth < 768);
  };
  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <ChatsContext.Provider
      value={{ selectedChat, setSelectedChat, isScreenSmall, setIsScreenSmall }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const ChatsState = () => {
  return useContext(ChatsContext);
};
export default ChatsProvider;
