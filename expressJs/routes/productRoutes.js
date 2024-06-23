const {
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  patchProduct,
  getSingleProduct,
  searchProduct,
  filterProductByPrice,
} = require("../controllers/productController");

const express = require("express");
const productRouter = express.Router();

productRouter.route("/").get(getProduct).post(postProduct);

productRouter.route("/search").get(searchProduct);

productRouter.route("/filter").get(filterProductByPrice);

productRouter
  .route("/:id")
  .get(getSingleProduct)
  .put(putProduct)
  .patch(patchProduct)
  .delete(deleteProduct);

module.exports = productRouter;
