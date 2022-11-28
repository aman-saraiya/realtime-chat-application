const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//app
const app = express();

//database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to Mongo DB successful"))
  .catch((error) => console.log(`DB Connection Error ${error}`));

//middleware
app.use(cors());
// json() is a built-in middleware function in Express.
// This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser.
app.use(express.json());

readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

//routes
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server Started listening on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to server via socket.io.");
  socket.on("setup", (userData) => {
    const user = JSON.parse(userData);
    socket.join(user._id);
    socket.emit("connected", user._id);
  });

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat || !chat.users) {
      console.log("chat or chat.users not defined.");
      return;
    }
    for (let i = 0; i < chat.users.length; i++) {
      if (chat.users[i]._id == newMessageReceived.sender._id) {
        continue;
      } else {
        socket
          .to(chat.users[i]._id)
          .emit("message received", newMessageReceived);
      }
    }
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room " + room);
  });
  socket.on("leave chat", (room) => {
    socket.leave(room);
    console.log("user left room " + room);
  });

  socket.on("new group", (newGroupChatReceived) => {
    if (!newGroupChatReceived || !newGroupChatReceived.users) {
      console.log("Group chat or group chat users missing");
      return;
    } else {
      for (let i = 0; i < newGroupChatReceived.users.length; i++) {
        if (
          newGroupChatReceived.users[i]._id ==
          newGroupChatReceived.groupAdmin._id
        ) {
          continue;
        } else {
          socket
            .to(newGroupChatReceived.users[i]._id)
            .emit("added to new group");
        }
      }
    }
  });
  socket.on("typing", (room) => {
    console.log(room);
    socket.to(room).emit("typing");
  });
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
    console.log(userData._id);
  });
});
