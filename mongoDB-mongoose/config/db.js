const mongoose = require("mongoose");

const url =
  "mongodb+srv://nileshgaur99:CleEw3tIuMHNoMtX@cluster0.8fxtzuf.mongodb.net/?appName=Cluster0";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
    console.log(error);
  });
