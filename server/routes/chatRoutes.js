const express = require("express");
const router = express.Router();

// import middleware
const { authCheck } = require("../middleware/auth");

// import controllers
const {
  fetchChats,
  createOrFetchPersonalChat,
  createGroupChat,
  addUserToGroup,
  removeUserFromGroup,
  renameGroup,
} = require("../controllers/chatControllers");

router.get("/chat/:userId", authCheck, fetchChats);
router.post("/chat", authCheck, createOrFetchPersonalChat);
router.post("/chat/group/create", authCheck, createGroupChat);
router.put("/chat/group/addUser", authCheck, addUserToGroup);
router.put("/chat/group/removeUser", authCheck, removeUserFromGroup);
router.put("/chat/group/renameGroup", authCheck, renameGroup);

module.exports = router;
