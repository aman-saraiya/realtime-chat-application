import React, { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";
import MessageCard from "./MessageCard";
import { useRef } from "react";
import { message } from "antd";
import { Virtuoso } from "react-virtuoso";

const MessageDisplay = ({
  socket,
  messages,
  setMessages,
  virtuoso,

  sentMessage,
  setSentMessage,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const { selectedChat } = ChatsState();
  const [loading, setLoading] = useState(false);
  const [topReached, setTopReached] = useState(false);
  const loadMessages = async () => {
    setLoading(true);
    const response = await fetchMessages(selectedChat._id, 20, 0);
    setMessages(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
    setTopReached(false);
  }, [selectedChat]);

  const appendMessages = async () => {
    if (topReached) return;

    const messages_to_append = 5;
    const response = await fetchMessages(
      selectedChat._id,
      messages_to_append,
      messages.length
    );
    // console.log(messages.length, response.data.length);
    if (messages.length && !response.data.length) {
      setTopReached(true);
      return;
    } else {
      const nextFirstItemIndex = firstItemIndex - messages_to_append;
      setFirstItemIndex(() => nextFirstItemIndex);
      setMessages((prevState) => [...response.data, ...prevState]);
    }
  };
  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  const START_INDEX = 10000;
  const INITIAL_ITEM_COUNT = 20;
  const [firstItemIndex, setFirstItemIndex] = useState(1000000000);
  return (
    <div className="chatbox" style={{ border: "1px solid green" }}>
      {!loading && (
        <Virtuoso
          firstItemIndex={firstItemIndex}
          initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
          data={messages}
          startReached={appendMessages}
          itemContent={(index, message) => {
            return <MessageCard message={message} />;
          }}
          ref={virtuoso}
          followOutput={(isAtBottom) => {
            if (sentMessage) {
              setSentMessage(false);
              return "auto";
            } else {
              return false;
            }
          }}
        />
      )}
      <div>{isTyping && "Typing"}</div>
    </div>
  );
};

export default MessageDisplay;
