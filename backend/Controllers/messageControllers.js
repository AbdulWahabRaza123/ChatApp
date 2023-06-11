const asyncHandler = require("express-async-handler");
const Message = require("../Models/messageModel");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const crypto = require("crypto");
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
function encryptAffine(text, a = 5, b = 8) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const modulus = alphabet.length;
  let encryptedText = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    const index = alphabet.indexOf(char);

    if (index === -1) {
      // If the character is not in the alphabet, keep it as is
      encryptedText += char;
    } else {
      // Apply the Affine cipher encryption formula
      const encryptedIndex = (a * index + b) % modulus;
      const encryptedChar = alphabet[encryptedIndex];
      encryptedText += encryptedChar;
    }
  }

  return encryptedText;
}
// Function to decrypt a string using the Affine cipher
function decryptAffine(encryptedText, a = 5, b = 8) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const modulus = alphabet.length;
  const inverseA = modInverse(a, modulus);
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedText[i].toLowerCase();
    const index = alphabet.indexOf(char);

    if (index === -1) {
      // If the character is not in the alphabet, keep it as is
      decryptedText += char;
    } else {
      // Apply the Affine cipher decryption formula
      const decryptedIndex = (inverseA * (index - b + modulus)) % modulus;
      const decryptedChar = alphabet[decryptedIndex];
      decryptedText += decryptedChar;
    }
  }

  return decryptedText;
}
// Helper function to calculate the modular multiplicative inverse
function modInverse(a, m) {
  let [x, y, gcd] = extendedEuclidean(a, m);

  if (gcd !== 1) {
    throw new Error("Modular inverse does not exist.");
  }

  return ((x % m) + m) % m;
}

// Helper function to perform the extended Euclidean algorithm
function extendedEuclidean(a, b) {
  if (b === 0) {
    return [1, 0, a];
  }

  const [x, y, gcd] = extendedEuclidean(b, a % b);
  const newX = y;
  const newY = x - Math.floor(a / b) * y;

  return [newX, newY, gcd];
}

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("invalid data pass to the request");
    return res.statusCode(400);
  }
  const encryptContent = encryptText(content);
  const cipher = encryptAffine(encryptContent);
  var newMessage = {
    sender: req.user._id,
    content: cipher,
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
    const decryptedMessage = decryptAffine(message.content);
    const plainText = decryptText(decryptedMessage);

    message["content"] = plainText;
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
