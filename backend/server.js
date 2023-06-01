const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./Config/db");
const cors = require("cors");
connectDB();
const chats = require("./data");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const app = express();
app.use(express.json()); //to accept json data
app.use(cors());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
//if path not found then
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening to port =>", PORT);
});
