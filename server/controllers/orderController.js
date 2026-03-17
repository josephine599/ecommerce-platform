const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    orderItems,
    user: req.user._id,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

module.exports = { createOrder };