const express = require("express");
const router = express.Router();
const path = require("path");

const productController = require(path.join(__dirname, "../controllers/ProductController"));

router.get("/", productController.getAllProducts);
router.post("/create", productController.createProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProduct);
// router.delete("/:id", productController.deleteProduct);

module.exports = router;