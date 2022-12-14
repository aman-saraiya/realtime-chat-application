import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { ChatsState } from "../context/ChatsProvider";
import SendMessage from "../forms/SendMessage";
import MessageDisplay from "../message/MessageDisplay";
import MessageHeader from "../navbar/MessageHeader";

const MessageWindow = ({
  setFetchChatsAgain,
  socket,
  notifications,
  setNotifications,
}) => {
  const { selectedChat } = ChatsState();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [messageInputHeight, setMessageInputHeight] = useState(1.5);
  const [typing, setTyping] = useState(false);
  const virtuoso = useRef(null);
  const [sentMessage, setSentMessage] = useState(false);
  useEffect(() => {
    {
      selectedChat && socket.emit("join chat", selectedChat._id);
      if (selectedChat && notifications.indexOf(selectedChat._id) !== -1) {
        setNotifications((prevState) =>
          prevState.filter((chatId) => chatId !== selectedChat._id)
        );
      }
    }
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("MESSAGE RECEIVED");
      // console.log(newMessageReceived);
      if (selectedChat && newMessageReceived.chat._id == selectedChat._id) {
        setMessages((prevState) => [...prevState, newMessageReceived]);
      } else {
        const chatIndex = notifications.indexOf(newMessageReceived.chat._id);
        if (chatIndex == -1) {
          setNotifications((prevState) => [
            ...prevState,
            newMessageReceived.chat._id,
          ]);
          setFetchChatsAgain((prevState) => !prevState);
        } else if (chatIndex != notifications.length - 1) {
          setFetchChatsAgain((prevState) => !prevState);
        }
      }
    });
  });
  return selectedChat ? (
    <>
      <MessageHeader />
      <div className="message_section">
        <MessageDisplay
          setSentMessage={setSentMessage}
          messages={messages}
          setMessages={setMessages}
          socket={socket}
          messageInputHeight={messageInputHeight}
          virtuoso={virtuoso}
          sentMessage={sentMessage}
        />
        <SendMessage
          messages={messages}
          typing={typing}
          setTyping={setTyping}
          setFetchChatsAgain={setFetchChatsAgain}
          socket={socket}
          setMessages={setMessages}
          setMessageInputHeight={setMessageInputHeight}
          virtuoso={virtuoso}
          setSentMessage={setSentMessage}
        />
      </div>
    </>
  ) : (
    <div className="message_section_placeholder"></div>
  );
};

export default MessageWindow;
