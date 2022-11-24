const User = require("../models/userModel");
const createOrUpdateUser = async (req, res) => {
  try {
    const { name, email, photoURL } = req.user;

    const user = await User.findOneAndUpdate(
      { email: email },
      { name: name, profilePicture: photoURL },
      { new: true }
    );
    if (user) {
      console.log("User Updated.", user);
      res.json(user);
    } else {
      const newUser = await new User({
        email: email,
        name: name,
        profilePicture: photoURL,
      }).save();
      console.log("User Created.", newUser);
      res.json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

const currentUser = async (req, res) => {
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
module.exports = { createOrUpdateUser, currentUser, fetchUsers };
