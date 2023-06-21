const express = require("express");
const router = express.Router();
const path = require("path");

const couponController = require(path.join(__dirname, "../controllers/CouponController"));

router.get("/", couponController.getCoupons);
router.get("/:id", couponController.getUserCoupons);
router.delete("/:id/", couponController.deleteCoupon);
router.put("/:id", couponController.editCoupon);
router.post("/", couponController.createCoupon);

module.exports = router;
