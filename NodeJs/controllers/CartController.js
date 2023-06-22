const path = require("path");
const models = require(path.join(__dirname, "../models"));
const { Op } = require("sequelize");
require("dotenv").config({ path: __dirname + "/.env" });

const getCart = async (req, res) => {
    const userId = parseInt(req.params.id);
    try {
      const user = await models.User.findByPk(userId, {
        include: [
          {
            model: models.Game,
            through: models.Cart
          }
        ]
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const cart = user.Games; // Assuming the association accessor is named "Games"
  
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: err.message });
      return;
    }
  };  

const removeFromCart = async (req, res) => {

    const gameId = parseInt(req.params.gameId)
    const userId = parseInt(req.params.id)

    try {
        const removeFromCart = await models.Cart.destroy({
            where: {
                userId: userId,
                gameId: gameId
            }
        });
        if (removeFromCart) {
            res.status(200).json({ message: "Item removed" });
            return;
        } else {
            res.status(400).json({ message: "Failed to remove item" });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};

const emptyCart = async (req, res) => {

    const userId = parseInt(req.params.id)

    try {
        const emptyCart = await models.Cart.destroy({
            where: {
                userId: userId,
            }
        });
        if (emptyCart) {
            res.status(200).json({ message: "Cart emptied" });
            return;
        } else {
            res.status(400).json({ message: "Failed to empty cart" });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};

const addToCart = async (req, res) => {

    const userId =parseInt (req.body.userId)
    const gameId = parseInt(req.body.gameId)

    try {
        const addToCart = await models.Cart.create({
            userId,
            gameId
        });
        // console.log(addToCart)
        if (addToCart) {
            res.status(200).json({ message: "Item added" });
            return;
        } else {
            res.status(400).json({ message: "Failed to add item" });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};

module.exports = {
    getCart,
    removeFromCart,
    emptyCart,
    addToCart
};