const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("invalid data pass to the request");
    return res.statusCode(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    //fetch the name and pic of sender
    message = await message.populate("sender", "name pic");
    //fetch everything from chat
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (e) {
    res.status(400);
    throw new Error(error.message);
  }
});
const allMessages = asyncHandler(async (req, res) => {
  try {
    const message = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(message);
  } catch (e) {
    res.status(400);
    throw new Error(error.message);
  }
});
module.exports = { sendMessage, allMessages };
