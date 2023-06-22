const express = require("express");
const router = express.Router();
const path = require("path");

const cartController = require(path.join(__dirname, "../controllers/CartController"));

router.get("/:id", cartController.getCart);
router.delete("/:id/:gameId", cartController.removeFromCart);
router.delete("/:id", cartController.emptyCart);
router.post("/", cartController.addToCart);

module.exports = router;