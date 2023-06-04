const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
function encryptText(text) {
  let encryptedText = "";
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);
    let encryptedCharCode = charCode + 1;
    let encryptedChar = String.fromCharCode(encryptedCharCode);
    encryptedText += encryptedChar;
  }
  return encryptedText;
}
function decryptText(encryptedText) {
  let decryptedText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    let encryptedCharCode = encryptedText.charCodeAt(i);
    let charCode = encryptedCharCode - 1;
    let decryptedChar = String.fromCharCode(charCode);
    decryptedText += decryptedChar;
  }
  return decryptedText;
}
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("invalid data pass to the request");
    return res.statusCode(400);
  }
  const encryptContent = encryptText(content);
  console.log("This is encrypted message ", encryptContent);
  var newMessage = {
    sender: req.user._id,
    content: encryptContent,
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
    console.log("This is content of message ", decryptText(message.content));
    message["content"] = decryptText(message.content);
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
