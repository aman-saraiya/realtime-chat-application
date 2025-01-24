const User = require("../models/userModel");
const createOrUpdateUser = async (req, res) => {
  try {
    console.log(req.user);
    const { name, email } = req.user;

    const user = await User.findOneAndUpdate(
      { email: email },
      { name: name },
      { new: true }
    );
    if (user) {
      console.log("User Updated.", user);
      res.json(user);
    } else {
      const newUser = await new User({
        email: email,
        name: name,
      }).save();
      console.log("User Created.", newUser);
      res.json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async (req, res) => {
  const { email } = req.user;
  const user = await User.findOne({ email: email });
  res.json(user);
};

const fetchUsers = async (req, res) => {
  const { userId } = req.params;
  const filter = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(filter).find({ _id: { $ne: userId } });
  res.json(users);
};
const updateProfileImage = async (req, res) => {
  try {
    const { email } = req.user;
    const { profilePictureUri } = req.body;

    const user = await User.findOneAndUpdate(
      { email: email },
      { profilePicture: profilePictureUri },
      { new: true }
    );
    console.log("User Updated.", user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createOrUpdateUser,
  getCurrentUser,
  fetchUsers,
  updateProfileImage,
};
