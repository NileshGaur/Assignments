const express = require("express");
require("./config/db");
const app = express();

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
