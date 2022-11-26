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
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat || !chat.users) {
      console.log("chat or chat.users not defined.");
      return;
    }
    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.to(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    socket.emit("user joined room " + room);
  });

  socket.on("typing", (room) => socket.to(room).emit("typing"));
  socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));
});
