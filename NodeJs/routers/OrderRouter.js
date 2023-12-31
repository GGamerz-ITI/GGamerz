const express = require('express');
const router = express.Router();
const path = require("path");
const OrderController = require(path.join(__dirname, "../controllers/OrderController"));

// Get all orders
router.get('/', OrderController.getAllOrders);

// Get order by ID
router.get('/:id', OrderController.getOrderById);

// Get user orders
router.get('/user/:id', OrderController.getUserOrders);

// Create a new order
router.post('/', OrderController.createOrder);

// Update an order by ID
router.put('/:id', OrderController.updateOrder);

// Delete an order by ID
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
