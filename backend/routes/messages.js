const express = require("express");
const router  = express.Router();
const { checkJwt } = require("../middleware/auth");
const { getMessages } = require("../controllers/messageController");

router.get("/:roomId", checkJwt, getMessages);

module.exports = router;
