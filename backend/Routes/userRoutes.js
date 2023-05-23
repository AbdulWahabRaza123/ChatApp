const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../Controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").post(registerUser).get(protect, allUsers);
router.route("/login").post(authUser);
router.get("/hello", (req, res) => {
  res.send("listening to API");
});
module.exports = router;
