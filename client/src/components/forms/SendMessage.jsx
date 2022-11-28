import { SendOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { sendMessage } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";

const SendMessage = ({
  setFetchChatsAgain,
  socket,
  setMessages,
  typing,
  setTyping,
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const { selectedChat } = ChatsState();

  const handleInputChange = (event) => {
    setMessageContent(event.target.value);

    if (!typing) {
      setTyping((prevState) => !prevState);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    {
      timeoutId && clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
      }
      setTyping(false);
    }, timerLength);
    setTimeoutId(id);
  };
  const handleSendMessage = async () => {
    const response = await sendMessage(selectedChat._id, messageContent);
    const message = response.data;
    socket.emit("stop typing", selectedChat._id);
    setFetchChatsAgain((prevValue) => !prevValue);
    setMessageContent("");
    socket.emit("new message", message);
    setMessages((prevState) => [...prevState, message]);
  };
  return (
    <div className="row p-0 m-0" style={{ height: "8%" }}>
      {/* <input style={{ width: "100%", border: "1px solid red" }} type="text" /> */}
      <div className="input-group p-0 m-0">
        <input
          style={{ width: "100%", border: "none" }}
          type="text"
          value={messageContent}
          onChange={handleInputChange}
        />
        <SendOutlined
          style={{ background: "white", fontSize: "25px", cursor: "pointer" }}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default SendMessage;
