const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const chats = require("./data");
const connectDB = require("./Config/db");
connectDB();
const app = express();
app.get("/", (req, res) => {
  res.send("listening to API");
});
app.get("/chats", (req, res) => {
  console.log("api called...");
  res.json(chats);
});
app.get("/chats/:id", (req, res) => {
  const { id } = req.params;

  const singleChat = chats.find((c) => c._id === id);
  res.json(singleChat);
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening to port =>", PORT);
});
