import React, { useState } from "react";
import Search from "../forms/Search";

const CurrentChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSendMessage = () => {};
  return (
    <div>
      <div style={{ height: 300, width: 400, border: "1px solid black" }}>
        {messages.map((message) => (
          <p>{message}</p>
        ))}
      </div>
      <div>
        Current Chat
        <form onSubmit={handleSendMessage}>
          <div className="form-group">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Message"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CurrentChat;
