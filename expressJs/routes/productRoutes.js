const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  patchProduct,
  getSingleProduct,
} = require("../controllers/productController");

const express = require("express");
const productRouter = express.Router();

productRouter.route("/").get(getProduct).post(postProduct);

productRouter
  .route("/:id")
  .get(getSingleProduct)
  .put(putProduct)
  .patch(patchProduct)
  .delete(deleteProduct);

module.exports = productRouter;
