import React, { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";
import { AutoSizer, List } from "react-virtualized";
import MessageCard from "./MessageCard";

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
  const [displayHeight, setDisplayHeight] = useState();
  const [displayWidth, setDisplayWidth] = useState();
  const [scrollIndex, setScrollIndex] = useState();
  useEffect(() => {
    loadMessages();
    const parent_height = document.getElementsByClassName("message_section")[0]
      .clientHeight;
    console.log(parent_height);
    const textAreaSize =
      parseFloat(getComputedStyle(document.documentElement).fontSize) *
      messageInputHeight;
    setDisplayHeight(parent_height - textAreaSize - 2);

    setDisplayWidth(
      document.getElementsByClassName("message_section")[0].clientWidth
    );
  }, [selectedChat, messageInputHeight]);

  const appendMessages = async () => {
    const response = await fetchMessages(selectedChat._id, 20, messages.length);
    setMessages((prevState) => [...response.data, ...prevState]);
  };
  useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);
  const handleMessagesScroll = ({ scrollTop }) => {
    if (scrollTop === 0) {
      appendMessages();
    }
  };

  return (
    <div className="chatbox" style={{ border: "1px solid green" }}>
      <div>{isTyping && "Typing"}</div>
      <AutoSizer>
        {({ width, height }) => (
          <List
            height={height}
            rowCount={messages.length}
            rowHeight={
              2.8 *
              parseFloat(getComputedStyle(document.documentElement).fontSize)
            }
            rowRenderer={({ index, key, style }) => (
              <div key={key} style={style}>
                <MessageCard message={messages[index]} />
              </div>
            )}
            width={width}
          />
        )}
      </AutoSizer>
    </div>

    // {messages && (
    //     <List
    //       height={displayHeight}
    //       onScroll={handleMessagesScroll}
    //       rowCount={messages.length}
    //       rowHeight={50}
    //       rowRenderer={({ index, key, style }) => (
    //         <div key={key} style={style}>
    //           <MessageCard message={messages[index]} />
    //         </div>
    //       )}
    //       scrollToIndex={20}
    //       width={displayWidth}
    //     />
    //   )}
  );
};

export default MessageDisplay;
