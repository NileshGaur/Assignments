const fsPromises = require("fs/promises");

const getProduct = async (req, res) => {
  const data = await fsPromises.readFile("./data.json", "utf-8");
  const product = JSON.parse(data);
  res.json({
    status: "success",
    data: {
      data: product,
    },
  });
  return;
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  let productsArray = [];

  try {
    const products = await fsPromises.readFile("./data.json", "utf-8");
    productsArray = JSON.parse(products);
  } catch (error) {
    productsArray = [];
  }

  const idx = productsArray.findIndex((ele) => ele.id == id);

  if (idx === -1) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  res.json({
    status: "success",
    data: {
      data: productsArray[idx],
    },
  });
};

const searchProduct = async (req, res) => {
  const { query } = req.query;
  let productsArray = [];

  try {
    const products = await fsPromises.readFile("./data.json", "utf-8");
    productsArray = JSON.parse(products);
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Could not read products",
    });
  }

  if (query) {
    productsArray = productsArray.filter((products) =>
      products.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  res.json({
    status: "success",
    data: {
      data: productsArray,
    },
  });
};
const filterProductByPrice = async (req, res) => {
  let { minPrice, maxPrice } = req.query;

  minPrice = parseInt(minPrice);
  maxPrice = parseInt(maxPrice);

  if (isNaN(minPrice) || isNaN(maxPrice)) {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid range",
    });
  }

  let productsArray = [];

  try {
    const products = await fsPromises.readFile("./data.json", "utf8");
    productsArray = JSON.parse(products);
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error Reading Products",
    });
  }

  const filteredProducts = productsArray.filter(
    (ele) => ele.price >= minPrice && ele.price <= maxPrice
  );
  res.json({
    status: "success",
    data: filteredProducts,
  });
};

const sortProductsByPrice = async (req, res) => {
  let { order } = req.query;

  console.log(order);

  if (!order) {
    return res.status(400).json({
      status: "error",
      message: "Please provide an order (asc or desc)",
    });
  }

  let productsArray = [];
  order = order.toLowerCase();

  try {
    const products = await fsPromises.readFile("./data.json", "utf-8");
    productsArray = JSON.parse(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Error reading products",
    });
  }

  if (order === "asc") {
    productsArray.sort((a, b) => a.price - b.price);
  } else if (order === "desc") {
    productsArray.sort((a, b) => b.price - a.price);
  } else {
    return res.status(400).json({
      status: "error",
      message: "Please provide a valid order",
    });
  }
  res.json({
    status: "success",
    data: {
      data: productsArray,
    },
  });
};

const postProduct = async (req, res) => {
  const body = req.body;

  if (!body.title || !body.price) {
    res.status(400);
    res.json({
      status: "error",
      message: "Please provide title and price",
    });
  }

  let productsArray = [];
  let id = 0;

  const product = await fsPromises.readFile("./data.json", "utf-8");
  try {
    // try-catch block to handle the case when the data.json file is empty
    productsArray = JSON.parse(product);
  } catch (error) {
    productsArray = [];
  }
  if (productsArray.length === 0) {
    body.id = 1;
  } else {
    body.id = productsArray[productsArray.length - 1].id + 1;
  }
  productsArray.push(body);
  await fsPromises.writeFile("./data.json", JSON.stringify(productsArray));

  res.status(201).json({
    status: "success",
    data: {
      data: {},
    },
  });
};

const putProduct = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.title || !body.price) {
    res.status(400);
    res.json({
      status: "error",
      message: "Please provide title and price",
    });
  }

  let productsArray = [];

  try {
    const product = await fsPromises.readFile("./data.json", "utf-8");
    productsArray = JSON.parse(product);
  } catch (error) {
    console.log(error);
    productsArray = [];
  }

  const productIndex = productsArray.findIndex((product) => product.id == id);

  if (productIndex !== -1) {
    productsArray[productIndex] = {
      id: productsArray[productIndex].id,
      ...body,
    };
    await fsPromises.writeFile("./data.json", JSON.stringify(productsArray));
    res.status(200).json({
      status: "Updated",
      data: {
        data: productsArray[productIndex],
      },
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  let productsArray = [];

  const products = await fsPromises.readFile("./data.json", "utf-8");

  try {
    productsArray = JSON.parse(products);
  } catch (error) {
    console.log(error);
    productsArray = [];
  }

  const productIndex = productsArray.findIndex((product) => product.id == id);

  if (productIndex !== -1) {
    productsArray.splice(productIndex, 1);
    await fsPromises.writeFile("./data.json", JSON.stringify(productsArray));
    res.status(200).json({
      status: "Deleted",
      data: {
        data: productsArray,
      },
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }
};

const patchProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let productsArray = [];

  try {
    const product = await fsPromises.readFile("./data.json", "utf-8");
    productsArray = JSON.parse(product);
  } catch (error) {
    console.log(error);
    productsArray = [];
  }

  const productIdx = productsArray.findIndex((ele) => ele.id == id);

  if (productIdx !== -1) {
    productsArray[productIdx] = {
      ...productsArray[productIdx],
      ...body,
    };

    await fsPromises.writeFile("./data.json", JSON.stringify(productsArray));
    res.status(200).json({
      status: "Updated",
      data: {
        data: productsArray[productIdx],
      },
    });
  } else {
    res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }
};

module.exports = {
  getProduct,
  getSingleProduct,
  postProduct,
  putProduct,
  deleteProduct,
  patchProduct,
  searchProduct,
  filterProductByPrice,
  sortProductsByPrice,
};
