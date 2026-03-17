const express = require("express");
const { createOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);

module.exports = router;
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5OWYwYzAwNGMzYmE5Zjk0YzQyOTA1YyIsImlhdCI6MTc3MjAzMTA2NSwiZXhwIjoxNzc0NjIzMDY1fQ.IqBS4gUEP2nYInTXfQYb-LdIPd1jBjbXh3hIvEAhU_o"
