const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dh94shztn/image/upload/v1671614422/MERN%20Chat%20App/personIcon_mgfjlq.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
