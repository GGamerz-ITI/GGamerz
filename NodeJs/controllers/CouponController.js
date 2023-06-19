const path = require("path");
const models = require(path.join(__dirname, "../models"));
const { Op } = require("sequelize");
require("dotenv").config({ path: __dirname + "/.env" });

const createCoupon = async (req, res) => {
    const coupon = {
        name: req.body.name,
        amount: req.body.amount,
        points: req.body.points,
        expDate: req.body.expDate
    }
    try {
        const createCoupon = await models.Coupon.create(coupon);
        if (createCoupon) {
            res.status(200).json({ message: "Coupon created" });
            return;
        } else {
            res.status(400).json({ message: "Failed to create coupon" });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};

const getCoupons = async (req, res) => {
    try {
        const getCoupons = await models.Coupon.findAll();
        res.json(getCoupons);
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};

const deleteCoupon = async (req, res) => {
    const couponId = req.params.id;
    try {
        const deleteCoupon = await models.Coupon.destroy({
            where: {
                id: couponId
            }
        });
        if (deleteCoupon) {
            res.status(200).json({ message: "Coupon deleted" });
            return;
        } else {
            res.status(400).json({ message: "Failed to delete coupon" });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};

const editCoupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const coupon = await models.Coupon.findByPk(couponId);
        if (coupon) {
            coupon.name = req.body.name || coupon.name
            coupon.amount = req.body.amount || coupon.amount
            coupon.points = req.body.points || coupon.points
            coupon.expDate = req.body.expDate || coupon.expDate
        }
        const editCoupon = await coupon.save();

        if (editCoupon) {
            res.status(200).json({ message: "Coupon updated" });
            return;
        } else {
            res.status(400).json({ message: "Failed to update coupon" });
            return;
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
};

module.exports = {
    createCoupon,
    getCoupons,
    deleteCoupon,
    editCoupon
};