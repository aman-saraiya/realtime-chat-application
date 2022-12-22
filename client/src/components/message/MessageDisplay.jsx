import React, { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";
import MessageCard from "./MessageCard";
import { useRef } from "react";
import { message } from "antd";
import { Virtuoso } from "react-virtuoso";
import { UserState } from "../context/UserProvider";
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
  const { user } = UserState();
  const [loading, setLoading] = useState(false);
  const [topReached, setTopReached] = useState(false);
  const loadMessages = async () => {
    setLoading(true);
    const response = await fetchMessages(selectedChat._id, 20, 0, user);
    setMessages(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
    setTopReached(false);
    setIsTyping(false);
  }, [selectedChat]);

  const appendMessages = async () => {
    if (topReached) return;

    const messages_to_append = 10;
    const response = await fetchMessages(
      selectedChat._id,
      messages_to_append,
      messages.length,
      user
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
    console.log("typing 1");
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stop typing");
    };
  }, []);

  const INITIAL_ITEM_COUNT = 20;
  const [firstItemIndex, setFirstItemIndex] = useState(1000000000);
  return (
    <div className="chatbox">
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
            if (sentMessage || isAtBottom) {
              setSentMessage(false);
              return "auto";
            } else {
              return false;
            }
          }}
        />
      )}
      <div>
        {isTyping && (
          <div class="typing-indicator p-1">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDisplay;
