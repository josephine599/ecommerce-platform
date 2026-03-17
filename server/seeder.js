const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/Product");
const products = require("./data/products");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {

await Product.deleteMany();

await Product.insertMany(products);

console.log("Products Imported!");

process.exit();

};

importData();