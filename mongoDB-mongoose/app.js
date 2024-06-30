const express = require("express");
const productRouter = require("./routes/productRoutes");

require("./config/db");
const app = express();

app.use(express.json());

app.use(productRouter);

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
