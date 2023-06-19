const express = require("express");
const router = express.Router();
const path = require("path");

const reviewController = require(path.join(__dirname, "../controllers/ReviewController"));

router.get("/comment/:id", reviewController.getAllReviewcomments);
router.get("/:id", reviewController.getCommentById);
router.delete("/:id", reviewController.createComment);
router.post("/create", reviewController.deleteComment);

module.exports = router;
