const Chat = require("../models/chatModel");

const fetchChats = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    console.log("UserId param not sent with the request.");
    res.status(400).send();
    return;
  }
  try {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users")
      .populate("latestMessage")
      .populate("groupAdmin")
      .sort({ updatedAt: -1 })
      .populate({
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
    return;
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
const createGroupChat = async (req, res) => {
  const { users, groupAdmin, chatName, groupPicture } = req.body;
  if (!users || !groupAdmin || !chatName) {
    res.status(400).send({ message: "Please fill all the fields" });
    return;
  }
  if (users.length < 1) {
    res.status(400).send({ message: "Group must have atleast 2 members." });
  }
  users.push(groupAdmin);
  try {
    let groupChat = {};
    if (groupPicture) {
      groupChat = await new Chat({
        isGroupChat: true,
        users: users,
        groupAdmin: groupAdmin,
        groupPicture: groupPicture,
        chatName: chatName,
      }).save();
    } else {
      groupChat = await new Chat({
        isGroupChat: true,
        users: users,
        groupAdmin: groupAdmin,
        chatName: chatName,
      }).save();
    }
    // console.log(groupChat);
    var fullGroupChat = await groupChat.populate("users");
    fullGroupChat = await fullGroupChat.populate("groupAdmin");
    console.log(fullGroupChat);
    res.status(200).json(fullGroupChat);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};
const addUserToGroup = async (req, res) => {
  const { newUser, loggedInUser, groupChatId } = req.body;
  console.log(newUser, loggedInUser, groupChatId);
  if (!newUser || !loggedInUser || !groupChatId) {
    console.log("Please pass all the details");
    res.sendStatus(400);
    return;
  }
  try {
    const chat = await Chat.findById(groupChatId);
    if (chat.groupAdmin == loggedInUser) {
      if (chat.users.includes(newUser)) {
        console.log("User already present in group.");
        res.sendStatus(400);
        return;
      } else {
        const updatedChat = await Chat.findByIdAndUpdate(
          groupChatId,
          {
            $push: { users: newUser },
          },
          { new: true }
        )
          .populate("users")
          .populate("groupAdmin")
          .exec();
        res.json(updatedChat);
        console.log(updatedChat);
      }
    } else {
      console.log("Only group admin can add or remove members.");
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};
const removeUserFromGroup = async (req, res) => {
  const { removeUser, loggedInUser, groupChatId } = req.body;
  // console.log(removedUser, loggedInUser, groupChatId);
  if (!removeUser || !loggedInUser || !groupChatId) {
    console.log("Please pass all the details");
    res.sendStatus(400);
    return;
  }
  try {
    const chat = await Chat.findById(groupChatId);
    if (chat.groupAdmin == loggedInUser) {
      if (!chat.users.includes(removeUser)) {
        console.log("User not present in group.");
        res.sendStatus(400);
      } else {
        const updatedChat = await Chat.findByIdAndUpdate(
          groupChatId,
          {
            $pull: { users: removeUser },
          },
          { new: true }
        )
          .populate("users")
          .populate("groupAdmin")
          .exec();
        res.json(updatedChat);
      }
    } else {
      console.log("Only group admin can add or remove members.");
      res.sendStatus(400);
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};
const renameGroup = async (req, res) => {
  const { newName, groupChatId } = req.body;
  if (!newName || !groupChatId) {
    console.log("Please pass all the details");
    res.sendStatus(400);
    return;
  }
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      groupChatId,
      {
        chatName: newName,
      },
      { new: true }
    )
      .populate("users")
      .populate("groupAdmin")
      .exec();
    console.log(updatedChat);

    res.json(updatedChat);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};

const updateGroupPicture = async (req, res) => {
  try {
    const { profilePictureUri, groupChatId } = req.body;
    if (!profilePictureUri || !groupChatId) {
      console.log("Please pass all the details");
      res.sendStatus(400);
      return;
    }
    const updatedChat = await Chat.findByIdAndUpdate(
      groupChatId,
      {
        groupPicture: profilePictureUri,
      },
      { new: true }
    )
      .populate("users")
      .populate("groupAdmin")
      .exec();
    console.log(updatedChat);

    res.json(updatedChat);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};

module.exports = {
  fetchChats,
  createGroupChat,
  createOrFetchPersonalChat,
  addUserToGroup,
  removeUserFromGroup,
  renameGroup,
  updateGroupPicture,
};
