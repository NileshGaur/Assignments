const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
  replaceProducts,
  updateProducts,
  validateID,
} = require("../controllers/productControllers");
const productRouter = express.Router();

productRouter.route("/products").get(getProducts).post(createProduct);

productRouter
  .route("/products/:id")
  .delete(validateID, deleteProduct)
  .put(validateID, replaceProducts)
  .patch(validateID, updateProducts);

module.exports = productRouter;
