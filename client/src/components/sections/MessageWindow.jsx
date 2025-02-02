import React, { useEffect, useRef, useState } from "react";

import { ChatsState } from "../context/ChatsProvider";
import { UserState } from "../context/UserProvider";
import SendMessage from "../forms/SendMessage";
import MessageDisplay from "../message/MessageDisplay";
import MessageHeader from "../navbar/MessageHeader";

const app_name = require("../../assets/app_name.png");
const MessageWindow = ({
  setFetchChatsAgain,
  socket,
  notifications,
  setNotifications,
}) => {
  const { selectedChat } = ChatsState();
  //const user = JSON.parse(window.localStorage.getItem("user"));
  const { user } = UserState();
  const [messages, setMessages] = useState([]);
  const [messageInputHeight, setMessageInputHeight] = useState(1.5);
  const [typing, setTyping] = useState(false);
  const virtuoso = useRef(null);
  const [sentMessage, setSentMessage] = useState(false);
  useEffect(() => {
    {
      var chatIdx = -1;
      if (selectedChat) {
        for (var i = 0; i < notifications.length; i++) {
          if (notifications[i]._id === selectedChat._id) {
            chatIdx = i;
            break;
          }
        }
      }

      if (selectedChat && chatIdx != -1) {
        setNotifications((prevState) =>
          prevState.filter((_, index) => index !== chatIdx)
        );
      }
    }
  }, [selectedChat, notifications]);

  useEffect(() => {
    selectedChat && socket.emit("join chat", selectedChat._id);
  }, [selectedChat]);
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // console.log("MESSAGE RECEIVED");

      if (selectedChat && newMessageReceived.chat._id == selectedChat._id) {
        setMessages((prevState) => [...prevState, newMessageReceived]);
      } else {
        // console.log("Went to Notification");
        var chatIndex = -1;
        // notifications.indexOf(newMessageReceived.chat._id);
        for (var i = 0; i < notifications.length; i++) {
          if (notifications[i]._id === newMessageReceived.chat._id) {
            chatIndex = i;
            break;
          }
        }
        console.log(chatIndex);
        if (chatIndex === -1) {
          setNotifications((prevState) => {
            return [
              ...prevState,
              { _id: newMessageReceived.chat._id, count: 1 },
            ];
          });
          setFetchChatsAgain((prevState) => !prevState);
        } else {
          setNotifications((prevState) => {
            return prevState.map((notification) =>
              notification._id === newMessageReceived.chat._id
                ? { _id: notification._id, count: notification.count + 1 }
                : notification
            );
          });
          setFetchChatsAgain((prevState) => !prevState);
        }
      }
    });
    return () => socket.off("message received");
  }, [selectedChat, notifications]);
  return selectedChat ? (
    <>
      {/* {JSON.stringify(notifications)} */}
      <MessageHeader socket={socket} />
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
          typing={typing}
          setTyping={setTyping}
          setFetchChatsAgain={setFetchChatsAgain}
          socket={socket}
          setMessages={setMessages}
          setMessageInputHeight={setMessageInputHeight}
          setSentMessage={setSentMessage}
        />
      </div>
    </>
  ) : (
    <div className="message_section_placeholder">
      <div
        className="d-flex align-items-center justify-content-center flex-column flex-grow-1"
        // style={{ border: "1px solid red" }}
      >
        <img
          src={app_name}
          style={{
            height: "20%",
            width: "40%",
            // border: "1px solid red",
            paddingBottom: "0",
            // backgroundColor: "#fef7e4"
          }}
        />
        <div style={{ fontSize: "0.8rem", color: "#676b68" }}>
          Select a chat to start messaging
        </div>
      </div>
    </div>
  );
};

export default MessageWindow;
