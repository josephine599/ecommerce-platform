const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      address, 
      city, 
      postalCode, 
      items, 
      total, 
      paymentMethod, 
      paymentData 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      return res.status(400).json({ 
        message: "Missing required shipping information" 
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ 
        message: "No order items provided" 
      });
    }

    if (!total || total < 1) {
      return res.status(400).json({ 
        message: "Invalid order total" 
      });
    }

    // Create order object
    const order = new Order({
      customer: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode
      },
      items,
      totalPrice: total,
      paymentMethod,
      paymentData: paymentData || {},
      paymentStatus: paymentMethod === 'mpesa' ? 'pending' : 'completed',
      orderStatus: 'pending',
      createdAt: new Date()
    });

    const createdOrder = await order.save();
    
    console.log("Order created successfully:", {
      orderId: createdOrder._id,
      customer: createdOrder.customer.email,
      total: createdOrder.totalPrice,
      paymentMethod,
      paymentStatus: createdOrder.paymentStatus
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: createdOrder
    });

  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to create order",
      error: error.message 
    });
  }
};

// Get Order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Payment Status
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, paymentStatus } = req.body;
    
    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log(`Payment status updated for order ${orderId}: ${paymentStatus}`);

    res.json({
      success: true,
      message: "Payment status updated",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrderById, updatePaymentStatus };