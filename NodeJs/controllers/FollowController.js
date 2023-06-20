const path = require("path");
const { Op } = require("sequelize");
const models = require(path.join(__dirname ,"../models"));
require("dotenv").config({ path: __dirname + "/.env" });

const follow = async (req,res) => {
    try {
        const  followerId = parseInt(req.body.userId);
        const  userId = parseInt(req.body.id); //my ID
        
        if (isNaN(followerId) || isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
          }
        
        if( userId == followerId)
        {
            return res.status(400).json({ message: "Can't follow yourself" });
        }
        // Check if the user and follower exist
        const [user, follower] = await Promise.all([
          models.User.findByPk(userId),
          models.User.findByPk(followerId),
        ]);

        if (!user || !follower) {
          return res.status(404).json({ message: 'User or follower not found' });
        }
  
        // Create the follower relationship
        const follow = await models.Follower.findOrCreate({
            where: {
                [Op.and]: [
                    { userId : userId },
                    { followerId: followerId}
                ]
            },
            defaults: {
                 userId : userId,
                 followerId: followerId
            }
        });
  
        if(!follow)
        {
            return res.status(400).json({ message: 'Failed to follow' });
        }
       return res.status(200).json({ message: 'Followed successfully' });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
      }
}

const unfollow = async (req,res) => {
    try {
        const  followerId = parseInt(req.body.userId);
        const  userId = parseInt(req.body.id); //my ID
        
        if (isNaN(followerId) || isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
          }
        
        if( userId == followerId)
        {
            return res.status(400).json({ message: "Can't follow/unfollow yourself" });
        }

        const followDelete = await models.Follower.destroy({
            where: {
                [Op.and]: [
                    { userId : userId },
                    { followerId: followerId}
                ]
            }
        })
  
        if(!followDelete)
        {
            return res.status(400).json({ message: 'Failed to unfollow' });
        }

            return res.status(200).json({ message: 'unfollowed successfully' });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' });
      }
}

const getUserFollowers = async (req, res) => {
    try {
      const  id  = req.params.id;
  
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
      }
      // Find the user by userId
      const user = await models.User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Retrieve all followers of the user
      const followers = await models.User.findAll({
        attributes: { exclude: ['password', 'emailVerifiedAt', 'createdAt', 'updatedAt'] },
        nested: false,
        include: {
            model: models.User,
            as: 'followers',
            attributes: [],
            where: {
                id : id
            },
          },
      });
  
     return res.json({ followers: followers });
    } catch (error) {
     return res.status(500).json({ error: 'Server error' });
    }
  };

const getUserFollowing = async (req, res) => {
  try {
    const  id  = req.params.id;

    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    // Find the user by userId
    const user = await models.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve all users that the user follow
    const following = await models.User.findAll({
      attributes: { exclude: ['password', 'emailVerifiedAt', 'createdAt', 'updatedAt'] },
      nested: false,
      include: {
          model: models.User,
          as: 'following',
          attributes: [],
          where: {
              id : id
          },
        },
    });

   return res.json({ followings: following });
  } catch (error) {
   return res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
    follow,
    unfollow,
    getUserFollowers,
    getUserFollowing
}