import React, { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";
import { List } from "antd";
import VirtualList from "rc-virtual-list";

const MessageDisplay = ({
  socket,
  messages,
  setMessages,
  messageInputHeight,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const { selectedChat } = ChatsState();
  const loadMessages = async () => {
    const response = await fetchMessages(selectedChat._id, 20, 0);
    setMessages(response.data);
  };
  useEffect(() => {
    loadMessages();
  }, [selectedChat]);

  const appendMessages = async () => {
    const response = await fetchMessages(selectedChat._id, 20, messages.length);
    setMessages((prevState) => [...response.data, ...prevState]);
  };
  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  const handleMessagesScroll = (event) => {
    if (event.currentTarget.scrollTop === 0) {
      appendMessages();
    }
  };
  const textAreaSize =
    parseFloat(getComputedStyle(document.documentElement).fontSize) *
    messageInputHeight;
  return (
    <div className="chatbox" style={{ border: "1px solid green" }}>
      <div>{isTyping && "Typing"}</div>
      <List>
        <VirtualList
          data={messages}
          itemKey="_id"
          height={200}
          onScroll={handleMessagesScroll}
        >
          {(item) => (
            <List.Item key={item._id}>
              <div>
                {item.sender.name} - {item.content}
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
      {/* {messages &&
        messages.map((message) => (
          <div key={message._id}>
            {message.sender.name} - {message.content}
          </div>
        ))}
      <div>{isTyping && "Typing"}</div> */}
    </div>
  );
};

export default MessageDisplay;
