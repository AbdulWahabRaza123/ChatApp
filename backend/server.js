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
app.use(
  cors({
    origin: ["http://localhost:5173/", "*/*"], // Replace with your desired URL
  })
);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
//if path not found then
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("listening to port =>", PORT);
});
//setting up socket.io

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");
  //to get the data from frontend and joining room
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  //this is the main thing here we will join the chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined the room ", room);
    socket.emit("joined");
  });
});
