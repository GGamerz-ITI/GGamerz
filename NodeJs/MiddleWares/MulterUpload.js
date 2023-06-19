const { storage } = require("../storage/storage");
const multer = require("multer");
const uploadProduct = multer({ storage }).fields([
    { name: "imageURL", maxCount: 5 },
    { name: "character", maxCount: 1 },
  ]);

module.exports = {
  uploadProduct,
};
