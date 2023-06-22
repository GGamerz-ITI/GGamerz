const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const path = require("path");
const User = require(path.join(__dirname,"../models/User.js"))
const models = require(path.join(__dirname ,"../models"));
const { Op } = require("sequelize");
require("dotenv").config({ path: __dirname + "/.env" });


// get all game reviews
const getAllReviewcomments = async (req, res) => {
  try {
    const review = await  models.Review.findOne({ where: { id: req.params.id } });
    if(!review)
    {
      return res.status(404).json({ message: "review not found" });
    }
    const comments = await models.Comment.findAll({ where: { reviewId: review.id } });
    if(!comments)
    {
      return res.status(404).json({ message: " no comments yet" });
    }
    // console.log(comments);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single comment by ID
const getCommentById = async (req, res) => {
  try {
    const comment = await  models.Comment.findOne({ where: { id: req.params.id } });
    if(!comment)
    {
      return res.status(404).json({ message: "comment not found" });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

// create a new comment
const createComment = async (req, res) => {
  try {
    let newcomment = {
      content: req.body.content,
      reviewId: req.body.reviewId,
      userId: req.body.userId
    };
    // Save comment
   try {
   const newcommentt = await models.Comment.create(newcomment);
   res.status(200).json(newcommentt);
   return;
} catch (err) {
   console.log(err.message);
   return res.status(400).json({ message: err.message})
}
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
};


// delete a comment by ID
const deleteComment = async (req, res) => {

  const CommentId = parseInt(req.params.id);
  if (isNaN(CommentId)) {
    res.status(400).json({ message: 'Invalid Comment Id' });
    return;
  }

  try {
    const deletedComment = await models.Comment.destroy({ where: {id: CommentId}});
    if (deletedComment) {
      res.status(200).json({ message: "review Deleted" });
      return;
    } else {
      res.status(400).json({ message: "Failed to delete comment" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};




module.exports = {
  getAllReviewcomments,
  getCommentById,
  createComment,
  deleteComment, 
};
