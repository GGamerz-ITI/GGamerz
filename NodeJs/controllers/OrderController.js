// const path = require("path");
// const models = require(path.join(__dirname, "../models"));
// const { Op } = require("sequelize");
// require("dotenv").config({ path: __dirname + "/.env" });

// // Get all orders
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.findAll();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get order by ID
// const getOrderById = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const order = await Order.findByPk(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all orders by userID
// const getOrdersByUserID = async (req, res) => {
//   try {
//     const userID = req.params.userID;
//     const orders = await Order.findAll({ where: { userID } });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create a new order
// const createOrder = async (req, res) => {
//   try {
//     const data = req.body;
//     const gameItems = data.gameItems;

//     let total = 0;
//     for (let i = 0; i < gameItems.length; i++) {
//       total += gameItems[i].price;
//     }

//     const newOrder = await Order.create({
//       gameItems: JSON.stringify(gameItems),
//       status: 'pending',
//       userID: data.userID,
//       date: new Date(),
//       numGames: gameItems.length,
//       total: total,
//     });

//     res.status(200).json(newOrder);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update order (status)
// const updateOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const newData = req.body;

//     const order = await Order.findByPk(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     if (order.status === "accepted") {
//       return res.status(400).json({ message: "Order has already been accepted and cannot be edited." });
//     }

//     if (order.status === "pending") {
//       await Order.update(
//         { status: newData.status },
//         { where: { id: orderId } }
//       );
//       return res.status(200).json({ message: "Order updated successfully" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete order
// const deleteOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const order = await Order.findByPk(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     if (order.status === 'accepted') {
//       return res.json("This order has already been accepted and cannot be deleted.");
//     }

//     await Order.destroy({ where: { id: orderId } });

//     res.json(order.status || "Not Found");
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   getAllOrders,
//   getOrdersByUserID,
//   createOrder,
//   updateOrder,
//   deleteOrder,
//   getOrderById,
// };
const { Order, User, Coupon, Game, OrderGame } = require('../models');

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get order by ID
async function getOrderById(req, res) {
  const orderId = req.params.id;
  try {
    const order = await Order.findByPk(orderId, {
      include: [User, Coupon, Game],
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}


// Create a new order
async function createOrder(req, res) {
  const { total, status, userId, couponId, gameItems } = req.body;

  try {
    const order = await Order.create({
      total,
      status,
      userId,
      couponId,
    });

    await order.addGames(gameItems);

    const createdOrder = await Order.findByPk(order.id, {
      include: [User, Coupon, Game],
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update an order by ID
async function updateOrder(req, res) {
  const orderId = req.params.id;
  const { total, status, userId, couponId } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      await order.update({
        total,
        status,
        userId,
        couponId,
      });

      const updatedOrder = await Order.findByPk(order.id, {
        include: [User, Coupon, Game],
      });

      res.json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete an order by ID
async function deleteOrder(req, res) {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      await order.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};

