const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const path = require("path");
const User = require(path.join(__dirname, "../models/User.js"));
const models = require(path.join(__dirname, "../models"));
const { Op } = require("sequelize");
const { uploadProduct } = require("../MiddleWares/MulterUpload");
require("dotenv").config({ path: __dirname + "/.env" });



const createProduct= async (req, res) => {
    try {
       await uploadProduct(req, res, async function (err) {
        if (err) {
          return res.status(500).send("Error uploading file");
        } else {
            const {name, price, releaseDate, description, tags, types, os}= req.body;
        //   if(req.files){
        //     console.log(req.files);
        //   }
        let myProduct= {
            name,
            price,
            releaseDate,
            description,
            tags,
            types,
            os,
        }
       
          myProduct.images = [];
          
          if(req.files){
            let images = req.files;
            images.forEach((img) => {
              myProduct["images"].push(process.env.CLOUD_PATH + img.filename) //name
              console.log(myProduct);
            });
            console.log(images)
            // myProduct.save();
          }
          const newProduct = await models.Game.create(myProduct);
          console.log(newProduct);
          res.status(200).json(newProduct);
        //   return;
        }
      })
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error, Failed to create the product !");
  }
  }
  module.exports = {
    createProduct
  }