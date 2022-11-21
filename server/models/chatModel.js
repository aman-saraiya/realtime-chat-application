const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isGroupChat: { type: Boolean, default: false },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatName: { type: String, required: true, trim: true },
    lastestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
