const { Console } = require("console");
const express = require("express");
const fsPromises = require("fs").promises;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    data: {},
  });
});

app.get("/products", async (req, res) => {
  const data = await fsPromises.readFile("./data.json", "utf-8");
  const product = JSON.parse(data);
  res.json({
    status: "success",
    data: {
      data: product,
    },
  });
});

app.post("/products", async (req, res) => {
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
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

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
      ...productsArray[productIndex],
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
});

app.delete("/products/:id", async (req, res) => {
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
});

app.listen(2000, () => {
  console.log("---------------Server is running on port 2000---------------");
});
