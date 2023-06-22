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
            updateLevel(user.id)
            return res.status(200).json({ message: "Points Updated" });
          }
        
    }catch(err){
        return  res.status(500).json({ message: err.message });
    }
}

async function updateLevel(id){
    try{
        let level = [
            "https://res.cloudinary.com/ds5puha49/image/upload/v1687129775/6009637_ow81gz.png",
            "https://res.cloudinary.com/ds5puha49/image/upload/v1687129813/gladiator_lzsrdo.png",
            "https://res.cloudinary.com/ds5puha49/image/upload/v1687183511/knight_orgjed.png",
            "https://res.cloudinary.com/ds5puha49/image/upload/v1687183511/ninja_ezadbb.png",
            "https://res.cloudinary.com/ds5puha49/image/upload/v1687183512/shadow_master_idjdbq.png",
            "https://res.cloudinary.com/ds5puha49/image/upload/v1687183512/wizard_pganik.png",
            "https://res.cloudinary.com/ds5puha49/image/upload/v1687218601/poseidon-transformed_jb2dsl.png"
        ];

        const user = await  models.User.findOne({ where: { id:  id } });
        if(!user)
        {
            return {status: false, msg: "User Not Found"}
        }

        switch(true)
        {
            case user.points < 50:
                user.level = level[0];
            break;

            case user.points < 150:
                user.level = level[1];
            break;

            case user.points < 300:
                user.level = level[2];
            break;

            case user.points < 600:
                user.level = level[3];
            break;

            case user.points < 1000:
                user.level = level[4];
            break;

            case user.points < 1500:
                user.level = level[5];
            break;

            default:
                user.level = level[6];
            break;
        }

        const updated = await user.save();
        if (!updated) {
            return {status: false, msg: "User Not Updated"}
          } else {
            return {status: true, msg: "User Updated"}
          }

    }catch(err){
        return {status: false, msg: "Server Error"}
    }
}

// const updateLevel = async (req,res) => {
//     try{
//         let level = req.body.level;

//         const user = await  models.User.findOne({ where: { id:  req.body.id } });
//         if(!user)
//         {
//             return res.status(404).json({ message: "User not found" });
//         }

//         user.level = level;
//         const updated = await user.save();
//         if (!updated) {
//             return res.status(401).json({ message: "Failed to update level" });
//           } else {
//             return res.status(200).json({ message: "Level Updated" });
//           }

//     }catch(err){
//         return  res.status(500).json({ message: err.message });
//     }
// }

module.exports = {
    updatePoints
}