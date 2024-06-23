const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  patchProduct,
} = require("../controllers/productController");

const express = require("express");
const productRouter = express.Router();

productRouter.route("/").get(getProduct).post(postProduct);

productRouter
  .route("/:id")
  .put(putProduct)
  .patch(patchProduct)
  .delete(deleteProduct);

module.exports = productRouter;
