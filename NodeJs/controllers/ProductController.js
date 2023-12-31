const Joi = require("joi");
const path = require("path");
const Game = require(path.join(__dirname, "../models/Game.js"));
const models = require(path.join(__dirname, "../models"));
const { uploadProduct } = require("../MiddleWares/MulterUpload");
require("dotenv").config({ path: __dirname + "/.env" });
const cloudinary = require('cloudinary').v2;

const getAllProducts =async (req, res) => {
    try {
      const products = await models.Game.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error retrieving products:", error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  };
const createProduct = async (req, res) => {
  try {
    await uploadProduct(req, res, async function (err) {
      if (err) {
        return res.status(500).send("Error uploading file");
      } else {
        const { name, price, releaseDate, description, tags, types, os, points } =
          req.body;

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
              console.log(myProduct["character"]);
          }
        }

        const newProduct = await models.Game.create(myProduct);
        res.status(200).json("product created successfully");
      }
    });
  } catch (err) {
    return res.status(400).send("Server Error, Failed to create the product !");
  }
  };
const updateProduct=async (req, res) => {
  
    try {
       await uploadProduct(req, res, async function (err) {
        if (err) {
          return res.status(500).send("Error uploading file");
        } else {
  
          const product = await  models.Game.findByPk(req.params.id)
            
          if(!product)
          {
            return res.status(404).json({message: "Product not found"})
          }
         
          product.name = req.body.name || product.name;
          product.price = req.body.price || product.price ;
          product.os = req.body.os || product.os;
          product.tags = req.body.tags || product.tags ;
          product.types = req.body.types || product.types;
          product.description = req.body.description ||product.description;
          product.releasedDate = req.body.releasedDate || product.releasedDate;
          product.points = req.body.points || product.points;
          
          if (req.files) {
            let newImages = req.files.imageURL;
            let newCharacters = req.files.character;
          
            // Remove old images from Cloudinary
           
          
            // Update images
            if (newImages && newImages.length > 0) {
                // Remove old images from Cloudinary
                if (product.images && product.images.length > 0) {
                  const publicIds = product.images.map((image) => {
                    const filename = image.split("/").pop();
                    return `games/${filename.split(".")[0]}`;
                  });
              
                  await cloudinary.api.delete_resources(publicIds);
                  product.images = [];
                }
              
                // Update images
                newImages.forEach((img) => {
                  product.images.push(process.env.CLOUD_PATH + img.filename);
                });
              }
              
            // Update character
            if (newCharacters && newCharacters.length > 0) {
              // Remove old character from Cloudinary
              if (product.character) {
                const publicId = product.character.split("/").pop().split(".")[0];
                await cloudinary.api.delete_resources(`characters/${publicId}`);
              }
          
              product.character = process.env.CLOUD_PATH + newCharacters[0].filename;
            }
          }
          
          
          const updatedProduct = await product.save();
  
          if(!updatedProduct)
          {
            return res.status(400).json({message: "Failed to update product"});
          }
      
          return res.status(200).json("prduct updated successfully");
        }
      })
    } catch (err) {
      console.error(error);
      res.status(500).send("An error occurred while updating the product.");
    }
  };
  const getProductById =async (req, res) => {
    try {
      const product = await models.Game.findByPk(req.params.id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while retrieving the product");
    }
  };
  const deleteProduct = async (req, res) => {
    try {
      const product = await models.Game.findByPk(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Delete the images from Cloudinary
      if (product.images && product.images.length > 0) {
        const publicIds = product.images.map((image) => {
          const filename = image.split("/").pop();
          return `games/${filename.split(".")[0]}`;
        });
  
        await cloudinary.api.delete_resources(publicIds);
      }
  
      // Delete the character from Cloudinary
      if (product.character) {
        const publicId = product.character.split("/").pop().split(".")[0];
        await cloudinary.api.delete_resources(`characters/${publicId}`);
      }
      await models.Review.destroy({
        where: {
          userId: req.params.id,
        },
      });
      // Delete the product from the database
      await models.Game.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while deleting the product.");
    }
  };
  

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductById,
  deleteProduct
};
