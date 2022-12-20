const express = require("express");
const router = express.Router();

//import controller
const { upload, remove } = require("../controllers/cloudinaryControllers");

//import middleware
const { authCheck } = require("../middleware/auth");

router.post("/uploadimages", authCheck, upload);
router.post("/removeimage", authCheck, remove);

module.exports = router;
