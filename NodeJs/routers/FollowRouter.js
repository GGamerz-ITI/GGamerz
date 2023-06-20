const express = require("express");
const router = express.Router();
const path = require("path");
const { route } = require("./UserStatsRouter");

const followController = require(path.join(__dirname, "../controllers/FollowController"));


router.post('/follow',followController.follow);
router.post('/unfollow',followController.unfollow);

router.get('/:id/followers',followController.getUserFollowers); // Get User followers
router.get('/:id/followings',followController.getUserFollowing); // Get People who are followed

module.exports = router;