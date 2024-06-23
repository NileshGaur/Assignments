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
  postProduct,
  putProduct,
  deleteProduct,
  patchProduct,
};
