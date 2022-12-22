const express = require("express");
const router = express.Router();

// import controller
const {
  createOrUpdateUser,
  getCurrentUser,
  fetchUsers,
  updateProfileImage,
} = require("../controllers/userControllers");

// import middleware
const { authCheck } = require("../middleware/auth");
router.post("/user/create-or-update", authCheck, createOrUpdateUser);
router.post("/user/current-user", authCheck, getCurrentUser);
router.get("/user/:userId", authCheck, fetchUsers);
router.put("/user/updateProfileImage", authCheck, updateProfileImage);
module.exports = router;
