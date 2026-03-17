const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Create product (Admin)
const createProduct = async (req, res) => {
  const { name, price, description, image, countInStock } = req.body;

  const product = new Product({
    name,
    price,
    description,
    image,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

module.exports = { getProducts, createProduct };