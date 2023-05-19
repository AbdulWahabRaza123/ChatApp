const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./Config/db");
const cors = require("cors");
connectDB();
const chats = require("./data");
const userRoutes = require("./Routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const app = express();
app.use(express.json()); //to accept json data
app.use(cors());
app.use("/api/user", userRoutes);
//if path not found then
app.use(notFound);
app.use(errorHandler);
// app.get("/api/hello", (req, res) => {
//   res.send("listening to API");
// });
// app.get("/chats", (req, res) => {
//   console.log("api called...");
//   res.json(chats);
// });
// app.get("/chats/:id", (req, res) => {
//   const { id } = req.params;

//   const singleChat = chats.find((c) => c._id === id);
//   res.json(singleChat);
// });
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening to port =>", PORT);
});
