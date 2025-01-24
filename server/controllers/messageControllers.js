const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const sendMessage = async (req, res) => {
  const { senderId, chatId, content } = req.body;
  if (!content || !chatId || !senderId) {
    console.log("Invalid data passed to the request");
    res.sendStatus(400);
  }
  const newMessage = {
    sender: senderId,
    chat: chatId,
    content: content,
  };
  try {
    var message = await new Message(newMessage).save();
    message = await message.populate("sender");
    message = await message.populate("chat");
    message = await message.populate({
      path: "chat.users",
    });
    // console.log(message);
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    console.log(error.message);
  }
};

const fetchMessages = async (req, res) => {
  const { chatId } = req.params;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);
  try {
    const messages = await Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .populate("sender")
      .populate("chat");
    res.json(messages.reverse());
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage, fetchMessages };
