const express = require("express");
const router = express.Router();
const path = require("path");

const reviewController = require(path.join(__dirname, "../controllers/ReviewController"));

router.get("/game/:id", reviewController.getAllGameReviews);
router.get("/:id", reviewController.getReviewById);
router.delete("/:id", reviewController.deleteReview);
router.post("/create", reviewController.createReview);

module.exports = router;
