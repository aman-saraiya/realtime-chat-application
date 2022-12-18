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
  setSentMessage,
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
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      console.log("Set Timeout Called");
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      console.log(timeDiff);
      console.log(timerLength);
      console.log(typing);
      if (timeDiff >= timerLength) {
        console.log("Stop Typing Emitted");
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
    setMessageInputHeight(1.5);
    document.getElementsByClassName("message_input")[0].style.height = `1.5rem`;
    setMessageContent("");
    socket.emit("new message", message);
    setMessages((prevState) => [...prevState, message]);
    setSentMessage(true);
  };
  return (
    <div
      className="d-flex m-0 p-1 align-items-end"
      style={{ backgroundColor: "#fef7e4" }}
    >
      <textarea
        className="message_input"
        type="text"
        value={messageContent}
        onChange={handleInputChange}
        placeholder="Message..."
      />
      <div className="send_button">
        <SendOutlined onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default SendMessage;
