const { Order, User, Coupon, Game, OrderGame, Cart } = require('../models');

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

//Get user orders

async function getUserOrders(req, res) {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Order,
          include: [
            {
              model: Game,
              through: OrderGame
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = user.Orders; // Assuming the association accessor is named "Games"
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
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
  console.log(req.body)
  // const { total, userId, couponId } = req.body;
  const total = req.body.total
  const userId = req.body.userId
  const couponId = req.body.couponId

  // console.log(total, userId, couponId)
  try {
    console.log("user found")

    const createdOrder = await Order.create({
      total: total,
      userId: userId,
      couponId: couponId
    });

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Game,
          through: Cart
        }
      ]
    });
    console.log("user found")
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.Games; // Assuming the association accessor is named "Games"
    const itemIds = cart.map(game => game.dataValues.id);
    if (!cart || cart.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    const orderGames = itemIds.map((itemId) => {
      return {
        orderId: createdOrder.id,
        gameId: itemId,
      };
    });

    await OrderGame.bulkCreate(orderGames);

    res.json(createdOrder);

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update an order by ID
async function updateOrder(req, res) {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "accepted") {
      return res.status(400).json({ message: "Order has already been accepted and cannot be edited." });
    }

    if (order.status === "pending") {
      await order.update({
        status: status
      });

      return res.status(200).json({ message: "Order updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete an order by ID
async function deleteOrder(req, res) {
  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      await OrderGame.destroy({
        where: {
          orderId: orderId
        }
      });

      await order.destroy();
      res.json({ message: 'Order deleted successfully' });
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
  getUserOrders
};
