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
  setMessageInputHeight,
}) => {
  const [messageContent, setMessageContent] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const { selectedChat } = ChatsState();
  const handleInputChange = (event) => {
    document.getElementsByClassName("message_input")[0].style.height = "1.5rem";
    setMessageInputHeight(1.5);
    var scrollHeight = event.target.scrollHeight;
    const font_size_px = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const text_rows = (scrollHeight - 0.5 * font_size_px) / font_size_px;
    if (text_rows <= 4) {
      document.getElementsByClassName(
        "message_input"
      )[0].style.height = `${1.5 + (text_rows - 1)}rem`;
      setMessageInputHeight(1.5 + (text_rows - 1));
    } else {
      document.getElementsByClassName(
        "message_input"
      )[0].style.height = `4.5rem`;
      setMessageInputHeight(4.5);
    }

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
  useEffect(() => {
    setMessageContent("");
  }, [selectedChat]);
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
    <div
      className="d-flex p-0 m-0 align-items-end"
      style={{
        border: "2px solid green",
      }}
    >
      {/* <input style={{ width: "100%", border: "1px solid red" }} type="text" /> */}

      <textarea
        className="message_input"
        type="text"
        value={messageContent}
        onChange={handleInputChange}
      />
      <div className="send_button">
        <SendOutlined
          style={{
            border: "1px solid red",
          }}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default SendMessage;
