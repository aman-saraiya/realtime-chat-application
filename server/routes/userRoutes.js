const express = require("express");
const router = express.Router();

// import controller
const {
  createOrUpdateUser,
  currentUser,
} = require("../controllers/userControllers");

// import middleware
const { authCheck } = require("../middleware/auth");
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);

module.exports = router;
