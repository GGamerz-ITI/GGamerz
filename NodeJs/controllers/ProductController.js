const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const path = require("path");
const User = require(path.join(__dirname, "../models/User.js"));
const models = require(path.join(__dirname, "../models"));
const { Op } = require("sequelize");
require("dotenv").config({ path: __dirname + "/.env" });



const cretaeProduct= async (req, res) => {
    try {
       await uploadProduct(req, res, async function (err) {
        if (err) {
          return res.status(500).send("Error uploading file");
        } else {
            const {name, price, releaseDate, description, tags, types, os}= req.body;
          if(req.files){
            console.log(req.files);
          }
        let myProduct= {
            name,
            price,
            releaseDate,
            description,
            tags,
            types,
            os,

        }
       
        //   let product = await Product.create({
        //     name: req.body.name,
        //     price: req.body.price,
        //     os: req.body.os,
        //     tag: req.body.tag,
        //     type: req.body.type,
        //     description: req.body.description,
        //     // releasedDate: req.body.releasedDate,
        //     // images: fileNames, // Save the secure URLs of the uploaded images
        //   });
        //   if (!product) {
        //     return res.status(400).send("There is No Product With this ID !");
        //   }
          
          myProduct.images = [];
          
          if(req.files){
            let images = req.files;
            images.forEach((img) => {
              myProduct["images"].push(process.env.CLOUD_PATH + img.filename) //name
              console.log(myProduct);
            });
            console.log(images)
            myProduct.save();
          }
          const newProduct = await models.Game.create(myProduct);
          res.status(200).json(newProduct);
          return;
        //   return res.status(200).json({ updatedProduct: product });
        }
      })
    } catch (err) {
      console.log(err);
      return res.status(500).send("Server Error, Failed to create the product !");
  }
  }
  ;