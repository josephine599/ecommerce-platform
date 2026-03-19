const express = require("express");
const { createOrder, getOrderById, updatePaymentStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create order (no auth required for guest checkout)
router.post("/", createOrder);

// Get order by ID
router.get("/:id", getOrderById);

// Update payment status (can add auth if needed)
router.put("/:id/payment-status", updatePaymentStatus);

module.exports = router;
