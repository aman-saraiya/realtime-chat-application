import React, { useEffect, useState } from "react";
import { fetchMessages } from "../../utils/message";
import { ChatsState } from "../context/ChatsProvider";
import {
  CellMeasurer,
  AutoSizer,
  List,
  InfiniteLoader,
  CellMeasurerCache,
} from "react-virtualized";
import MessageCard from "./MessageCard";
import { useRef } from "react";

const cache = new CellMeasurerCache();

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
  // const [displayHeight, setDisplayHeight] = useState();
  // const [displayWidth, setDisplayWidth] = useState();
  const [scrollIndex, setScrollIndex] = useState(0);

  const listRef = useRef(null);

  useEffect(() => {
    loadMessages();
    // const parent_height = document.getElementsByClassName("message_section")[0]
    //   .clientHeight;
    // console.log(parent_height);
    // const textAreaSize =
    //   parseFloat(getComputedStyle(document.documentElement).fontSize) *
    //   messageInputHeight;
    // setDisplayHeight(parent_height - textAreaSize - 2);

    // setDisplayWidth(
    //   document.getElementsByClassName("message_section")[0].clientWidth
    // );
  }, [selectedChat]);

  const appendMessages = async () => {
    const response = await fetchMessages(selectedChat._id, 20, messages.length);
    setScrollIndex(messages.length);
    console.log("CALLED");
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

  // const getRowHeight = (index, width) => {
  //   console.log(index, width);
  //   return 70;
  // };
  const rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    let content;
    if (index > messages.length) {
      content = <div>LOADING...</div>;
    } else {
      content = (
        <div style={style} key={key}>
          <MessageCard message={messages[index]} />
        </div>
      );
    }

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {content}
      </CellMeasurer>
    );
  };

  return (
    <div className="chatbox" style={{ border: "1px solid green" }}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <List
              ref={listRef}
              deferredMeasurementCache={cache}
              height={height}
              overscanRowCount={1}
              rowCount={messages.length}
              rowHeight={100}
              rowRenderer={rowRenderer}
              width={width}
              scrollToIndex={messages.length - scrollIndex}
              onScroll={handleMessagesScroll}
            />
          );
        }}
      </AutoSizer>
      <div>{isTyping && "Typing"}</div>
    </div>
  );
};
{
  /* <AutoSizer>
{({ width, height }) => (
  <CellMeasurer
    cache={cache}
    cellRenderer={({ rowIndex, ...rest }) =>
      rowRenderer({ index: rowIndex, ...rest })
    }
    columnCount={0}
    rowCount={messages.length}
    width={width}
    parent={parent}
  >
    {(getRowHeight, setRef) => (
      <List
        height={height}
        rowCount={messages.length}
        rowHeight={getRowHeight}
        ref={setRef}
        rowRenderer={rowRenderer}
        width={width}
        scrollToIndex={messages.length}
      />
    )}
  </CellMeasurer>
)}
</AutoSizer> */
}
export default MessageDisplay;
