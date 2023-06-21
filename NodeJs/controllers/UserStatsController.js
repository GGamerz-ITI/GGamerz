const path = require("path");
const models = require(path.join(__dirname ,"../models"));
require("dotenv").config({ path: __dirname + "/.env" });

const updatePoints = async (req,res) => {
    try{
        let points = parseInt(req.body.points);

        if(isNaN(points)){
            return res.status(400).json({ message: "Points Must be Integer" });
        }

        
        const user = await  models.User.findOne({ where: { id:  req.body.id } });
        if(!user)
        {
            return res.status(404).json({ message: "User not found" });
        }

        user.points = user.points + points;
        if(user.points < 0)
        {
            return res.status(400).json({ message: "Error total points can't be negative" });
        }
        const updated = await user.save();
        if (!updated) {
            return res.status(401).json({ message: "Failed to update points" });
          } else {
            return res.status(200).json({ message: "Points Updated" });
          }

    }catch(err){
        return  res.status(500).json({ message: err.message });
    }
}


const updateLevel = async (req,res) => {
    try{
        let level = req.body.level;

        const user = await  models.User.findOne({ where: { id:  req.body.id } });
        if(!user)
        {
            return res.status(404).json({ message: "User not found" });
        }

        user.level = level;
        const updated = await user.save();
        if (!updated) {
            return res.status(401).json({ message: "Failed to update level" });
          } else {
            return res.status(200).json({ message: "Level Updated" });
          }

    }catch(err){
        return  res.status(500).json({ message: err.message });
    }
}

module.exports = {
    updatePoints,
    updateLevel
}