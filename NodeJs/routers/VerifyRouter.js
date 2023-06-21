const express = require("express");
const router = express.Router();
const path = require("path");

const VerifyController = require(path.join(__dirname, "../controllers/VerifyController"));

router.post("/email", VerifyController.verifyEmail);
router.get("/emailVerify/:userId/:token", VerifyController.verify);

module.exports = router;