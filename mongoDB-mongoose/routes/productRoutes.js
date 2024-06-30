const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const productRouter = express.Router();

productRouter.get("/products", getProducts);
productRouter.post("/products", createProduct);
productRouter.delete("/products/:id", deleteProduct);

module.exports = productRouter;
