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
    const response = await fetchMessages(selectedChat._id);
    setMessages(response.data);
  };
  useEffect(() => {
    loadMessages();
  }, [selectedChat]);

  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  const handleMessagesScroll = () => {};
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
