const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const path = require("path");
const User = require(path.join(__dirname, "../models/User.js"))
const models = require(path.join(__dirname, "../models"));
const { Op } = require("sequelize");
require("dotenv").config({ path: __dirname + "/.env" });


// get all game reviews
const getAllGameReviews = async (req, res) => {
  try {
    const game_id = await models.Game.findOne({ where: { id: req.params.id } });
    if (!game_id) {
      return res.status(404).json({ message: "Game not found" });
    }

    const reviews = await models.Review.findAll({
      where: { gameId: game_id.id },
    });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await models.Review.findOne({ where: { id: req.params.id } });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

// create a new review
const createReview = async (req, res) => {
  try {
    // const {userId,gameId,content } = req.body;
    let newreview = {
      content: req.body.content,
      gameId: req.body.gameId,
      userId: req.body.userId
    };
    // Save review
    try {
      const newrevieww = await models.Review.create(newreview);
      res.status(200).json({ message: "review created successfully"});
      return;
    } catch (err) {
      return res.status(400).json({ message: err.message })
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// delete a review by ID
const deleteReview = async (req, res) => {

  const reviewId = parseInt(req.params.id);
  if (isNaN(reviewId)) {
    res.status(400).json({ message: 'Invalid review Id' });
    return;
  }

  try {
    const deleteReview = await models.Review.destroy({ where: { id: reviewId } });
    if (deleteReview) {
      res.status(200).json({ message: "review Deleted" });
      return;
    } else {
      res.status(400).json({ message: "Failed to delete review" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};


//get user reviews
const getReviewByUser = async (req, res) => {
  try {
    const reviews = await models.Review.findAll({
      where: {
        userId: req.params.id
      },
      include: [
        {
          model: models.Game 
        }
      ]
    });

   

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = {
  getAllGameReviews,
  getReviewById,
  createReview,
  deleteReview,
  getReviewByUser
};
