const Chat = require("../models/chatModel");

const fetchChats = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    console.log("UserId param not sent with the request.");
    res.status(400);
  }
  try {
    const chats = Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users")
      .populate("latestMessage")
      .populate("groupAdmin")
      .sort({ updatedAt: -1 });

    chats.populate({
      path: "latestMessage.sender",
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};
const createOrFetchPersonalChat = async (req, res) => {
  const { fromUser, toUser } = req.body;

  if (!fromUser || !toUser) {
    console.log("Chat users information missing");
    res.sendStatus(400);
  }

  const chat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: fromUser } } },
      { users: { $elemMatch: { $eq: toUser } } },
    ],
  })
    .populate("users")
    .populate({ path: "latestMessage", strictPopulate: false });

  if (chat) {
    await chat.populate({
      path: "latestMessage.sender",
      strictPopulate: false,
    });

    console.log("Chat Already Exists.");
    res.status(200).json(chat);
  } else {
    const newChat = {
      chatName: "sender",
      users: [fromUser, toUser],
    };
    try {
      const chat = await new Chat(newChat).save();
      console.log(chat);
      const fullChat = await chat.populate("users");
      res.status(200).json(fullChat);
    } catch (error) {
      console.log(error.message);
      res.sendStatus(400);
    }
  }
};
const createGroupChat = async (req, res) => {};
const addUserToGroup = async (req, res) => {};
const removeUserFromGroup = async (req, res) => {};
const renameGroup = async (req, res) => {};

module.exports = {
  fetchChats,
  createGroupChat,
  createOrFetchPersonalChat,
  addUserToGroup,
  removeUserFromGroup,
  renameGroup,
};
