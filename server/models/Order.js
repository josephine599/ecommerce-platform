const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customer: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    items: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        qty: Number,
        price: Number,
        image: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['mpesa', 'card', 'bank'],
      default: 'mpesa'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending'
    },
    paymentData: {
      checkoutRequestId: String,
      mpesaReceiptNumber: String,
      transactionRef: String
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);