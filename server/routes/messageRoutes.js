const express = require("express");
const router = express.Router();

// import middleware
const { authCheck } = require("../middleware/auth");

// import controllers
const {
  sendMessage,
  fetchMessages,
} = require("../controllers/messageControllers");

router.get("/message/:chatId", authCheck, fetchMessages);
router.post("/message", authCheck, sendMessage);

module.exports = router;
