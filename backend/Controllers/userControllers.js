const asyncHandler = require("express-async-handler");
//using async Handler to handle the errors
const User = require("../Models/userModel");
const generateToken = require("../Config/generateToken");
//register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log("This is image ", pic);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  await user.save();

  if (user) {
    console.log("User registered!");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create new User");
  }
});
//login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter all the fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not Exists");
  }
  console.log("This is user ", await user.matchPassword(password));
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to login the user");
  }
});
// /api/user?search=raza   (This is query)
// /api/:id   (this is params)
const allUsers = asyncHandler(async (req, res) => {
  // /api/user?search=abdul wahab
  // to get some other queries use & like below
  // /api/user?search=abdul wahab&lastname=raza
  // hum yehaan apne apko search nahi kr skte
  console.log("This is learning ", () => {
    return {
      name: { $regex: req.query.search, $options: "i" },
    };
  });
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          {
            email: { $regex: req.query.search, $options: "i" },
          },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
module.exports = { registerUser, authUser, allUsers };
