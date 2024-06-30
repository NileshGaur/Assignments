const productModel = require("./../models/productModels");

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await productModel.create(body);
    res.json({
      status: "success",
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await productModel.findByIdAndDelete(id);

    if (!deleteProduct) {
      res.json({
        status: "error",
        message: "Product not found",
      });
      return;
    } else {
      res.json({
        status: "success",
        message: "Product deleted successfully",
        data: deleteProduct,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
};
