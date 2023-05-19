const express = require("express");
const { registerUser, authUser } = require("../Controllers/userControllers");
const router = express.Router();
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.get("/hello", (req, res) => {
  res.send("listening to API");
});
module.exports = router;
