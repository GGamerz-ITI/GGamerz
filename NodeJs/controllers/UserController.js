const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const path = require("path");
const User = require(path.join(__dirname, "../models/User.js"));
const models = require(path.join(__dirname, "../models"));
const { Op } = require("sequelize");
const { use } = require("../routers/UserRouter");
require("dotenv").config({ path: __dirname + "/.env" });

// login
const login = async (req, res) => {
  try {
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;

    const user = await models.User.findOne({ where: { email: userEmail } });
    // Check if user is available ?
    if (!user) {
      res.status(404).json({ message: "Email not registered" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.password);
    // Check if password is valid ?
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    if (user.isBanned) {
      return res.status(403).json({ message: "User Banned" });
    }

    // Check if user is Verified
    if(!user.emailVerifiedAt)
    {
      return res.status(402).json({ message: "User is not verified"});
    }
    // User is found and valdated => creating token and send it
    userDataForToken = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(userDataForToken, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.json(token);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.json(users);
  } catch (err) {
   return res.status(500).json({ message: err.message });
  }
};

// get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await models.User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

// create a new user
const createUser = async (req, res) => {
  try {
    const { name, username, email, password, discord } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let myuser = {
      name,
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      // discord: discord.toLowerCase() || null,
    };

    // Validate Data
    const { error } = validateUser(myuser);
    if (error) {
      console.log("validation error");
      return res.status(400).json({ message: error.details });
    }

    // Save User
    try {
      const newUser = await models.User.create(myuser);
      res.status(200).json(newUser);
      return;
    } catch (err) {
      if (err.errors[0].message == "email must be unique") {
        return res.status(409).json({ message: "Email Already Registered" });
      } else {
        return res.status(400).json({ message: err.errors[0].message });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// update a user by ID
const updateUser = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      username: req.body.username,
      // email: req.body.email,
    };
    const { error } = validateUpdate(data);

    if (error) {
      return res.status(400).json({ message: error.details });
    }

    if (req.body.discord) {
      const discordEmailRegex = /^[\w-]+(\.[\w-]+)*@discord\.com$/;
      const isValidDiscordEmail = discordEmailRegex.test(req.body.discord);
      if (!isValidDiscordEmail) {
        return res.status(400).json({ message: "Wrong Discord Format" });
      }
    }
    if (req.body.password) {
      const saltRounds = 10;
      var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    }

    const user = await  models.User.findOne({ where: { id: req.params.id } });
    if (user) {
      user.name = req.body.name || user.name;
      user.username = req.body.username || user.username;
      // user.email = req.body.email || user.email;
      user.password = hashedPassword || user.password;
      user.discord = req.body.discord || user.discord;
      user.preferences = req.body.preferences || user.preferences;
      user.bgColor = req.body.bgColor || user.bgColor;
      user.character = req.body.character || user.character;
      user.level = req.body.level || user.level;

      const updatedUser = await user.save();

      if (!updatedUser) {
       return res.status(400).json({ message: "Failed to update" });
      }
      res.json(updatedUser);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    if(err.errors[0].message == "username must be unique")
    {
      return res.status(400).json({ message: "Username Already Taken" });
    }
    return res.status(500).json({ message: err.message });
  }
};

// delete a user by ID
const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const deleteUser = await models.User.destroy({ where: { id: userId } });
    if (deleteUser) {
      res.status(200).json({ message: "User Deleted" });
      return;
    } else {
      res.status(400).json({ message: "Failed to delete user" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};

// Ban user
const banUser = async (req, res) => {
  try {
    const user = await  models.User.findOne({ where: { id: req.body.id } });
    if(!user)
    {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role == "admin") {
      return res.status(403).json({ message: "Can't ban admin" });
    }
    user.isBanned = true;
    const banned = await user.save();

    if (!banned) {
      return res.status(401).json({ message: "failed to ban user" });
    } else {
      return res.status(200).json({ message: "User Banned" });
    }
  } catch (err) {
    return  res.status(500).json({ message: err.message });
  }
};

// Unban User
const unBanUser = async (req, res) => {
  try {
    const user = await  models.User.findOne({ where: { id: req.body.id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBanned = false;
    const banned = user.save();

    if (!banned) {
      return res.status(401).json({ message: "failed to unban user" });
    } else {
      return res.status(200).json({ message: "User Unbanned" });
    }
  } catch (err) {
    return  res.status(500).json({ message: err.message });
  }
};

const validateUser = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
    // discord: Joi.string(),
  });

  return userSchema.validate(data);
};

const validateUpdate = (data) => {
  const userSchema = Joi.object({
    name: Joi.string(),
    username: Joi.string(),
    // email: Joi.string().email(),
  });
  return userSchema.validate(data);
};

// Reset User Password
const passUpdate = async (req,res) =>{
  try
  {
      id = req.body.userId;
      token = req.body.token
      password = req.body.password

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const decoded = jwt.decode(token);
      let userEmail = decoded.email;
  
      const user = await models.ResetPasswordToken.findOne({ where: { email: userEmail } });
      if(!user)
      {
          return res.status(404).json({ message: "Please request new password reset" });
      }
  
      if(user.token != token)
      {
          return res.status(401).json({ message: "Invalid token" });
      }
  
      const deleteToken = await models.ResetPasswordToken.destroy({ where: { email: userEmail } });
      if (!deleteToken) {
         return res.status(400).json({ message: "Couldn't delete token" });
      }
          
     
      
      const updateUserPass = await models.User.update({ password: hashedPassword }, {
        where: {
          email: userEmail
        }
      });

      if (!updateUserPass) {
          return res.status(400).json({ message: "Failed to update password" });
       }

       return res.status(200).json({ message: "Updated Successfully" });
  }catch(err)
  {
      console.log(err)
      return res.status(500).json({ message: "Internal server error" });
  }
}


const usersWithUserPreference = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    const users = await models.User.findAll({
      where: {
        preferences: {
          // [Op.like]:  [`${searchTerm}`]
          [Op.or]: [   
            { [Op.like]: [`%${searchTerm}%`] },
            { [Op.like]: [`%${searchTerm},%`] },
            { [Op.like]: [`%,${searchTerm}`] },
            { [Op.like]: [`%,${searchTerm},%`] }
          ]
        }
      }
    });
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    } 

    // if (!searchTerm) {
    //   return res.status(400).json({ message: 'Missing search term' });
    // }

    res.json(users);
  } catch (err) {
    console.error(`Error fetching users: ${err.message}`);
    res.status(500).json({ message: 'Error fetching users' });
  }
};


module.exports = {
  usersWithUserPreference,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  banUser,
  unBanUser,
  passUpdate
};
