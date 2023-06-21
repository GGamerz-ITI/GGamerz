const express = require("express");
const router = express.Router();
const path = require("path");

const userStatsController = require(path.join(__dirname, "../controllers/UserStatsController"));

router.put("/points", userStatsController.updatePoints);

router.put("/level", userStatsController.updateLevel);

module.exports = router;