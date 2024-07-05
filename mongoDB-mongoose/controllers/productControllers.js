const productModel = require("./../models/productModels");
const mongoose = require("mongoose");

const validateID = async (req, res, next) => {
  const { id } = req.params;

  //validate if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid ID format",
    });
  }

  const product = await productModel.findById(id);

  if (!product) {
    res.status(404).json({
      status: "error",
      message: "Product not found",
    });
    return;
  }

  next();
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json({
      status: "success",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const replaceProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const replacedProduct = await productModel.findOneAndReplace(
      { _id: id },
      body,
      { returnDocument: "after" }
    );

    res.status(200).json({
      status: "success",
      data: replacedProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    body.updatedAt = Date.now();

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      body,
      { returnDocument: "after" }
    );

    res.status(200).json({
      status: "success",
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
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
  replaceProducts,
  updateProducts,
  validateID,
};
