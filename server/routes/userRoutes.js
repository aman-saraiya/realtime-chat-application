const express = require("express");
const router = express.Router();

// import controller
const {
  createOrUpdateUser,
  currentUser,
  fetchUsers,
} = require("../controllers/userControllers");

// import middleware
const { authCheck } = require("../middleware/auth");
router.post("/user/create-or-update", authCheck, createOrUpdateUser);
router.post("/user/current-user", authCheck, currentUser);
router.get("/user/:userId", authCheck, fetchUsers);
module.exports = router;
