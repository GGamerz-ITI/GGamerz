const express = require("express");
const router = express.Router();
const path = require("path");

const comentController = require(path.join(__dirname, "../controllers/CommentController"));

router.get("/review/:id", comentController.getAllReviewcomments);
router.get("/:id", comentController.getCommentById);
router.delete("/:id", comentController.createComment);
router.post("/create", comentController.deleteComment);

module.exports = router;
