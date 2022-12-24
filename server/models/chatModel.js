const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isGroupChat: { type: Boolean, default: false },
    groupPicture: {
      type: Object,
      default: {
        url: "https://res.cloudinary.com/dh94shztn/image/upload/v1671613414/MERN%20Chat%20App/groupIcon_zsoewt.png",
        _id: "default",
      },
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatName: { type: String, required: true, trim: true },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
