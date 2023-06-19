const Joi = require("joi");
const path = require("path");
const Game = require(path.join(__dirname, "../models/Game.js"));
const models = require(path.join(__dirname, "../models"));
const { uploadProduct } = require("../MiddleWares/MulterUpload");
require("dotenv").config({ path: __dirname + "/.env" });

const createProduct = async (req, res) => {
  try {
    await uploadProduct(req, res, async function (err) {
      if (err) {
        return res.status(500).send("Error uploading file");
      } else {
        const {
          name,
          price,
          releaseDate,
          description,
          tags,
          types,
          os,
          points,
        } = req.body;

        let myProduct = {
          name,
          price,
          releaseDate,
          description,
          tags,
          types,
          os,
          points,
        };

        myProduct.images = [];

        if (req.files) {
          let images = req.files.imageURL;
          let characters = req.files.character;

          if (images) {
            images.forEach((img) => {
              myProduct["images"].push(process.env.CLOUD_PATH + img.filename);
            });
          }

          if (characters) {
            myProduct["character"] =
              process.env.CLOUD_PATH + characters[0].filename;
          }
        }

        const newProduct = await models.Game.create(myProduct);
        res.status(200).json(newProduct);
      }
    });
  } catch (err) {
    return res.status(500).send("Server Error, Failed to create the product !");
  }
};
module.exports = {
  createProduct,
};
