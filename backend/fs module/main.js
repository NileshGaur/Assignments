// const sum = require("./server.js");

// const ans = sum(1, 2);

// console.log(ans);

// const figlet = require("figlet");

// figlet("Nilesh Gaur", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });

// var oneLinerJoke = require("one-liner-joke");
// var getRandomJoke = oneLinerJoke.getRandomJoke();
// console.log(getRandomJoke.body);

//promise function
// const fsPromises = require("fs/promises");
// console.log("start");
// const result = fsPromises.readFile("text.txt", "utf-8");
// console.log(result); // this will give the promise object
// result.then((data) => {
//   console.log(data);
// });
// console.log("end");

//Syncronous function
// const fs = require("fs");
// const data = fs.readFileSync("text.txt");
// // console.log(data); // this will give the buffer data of the file in hexadecimal format
// console.log("data: ", data.toString()); // this will give the data in string format
// // the other way is to give the encoding in the readFileSync function
// const data2 = fs.readFileSync("text.txt", "utf-8");
// console.log("data2: ", data2); // this will give the data in string format

//Asyncronous function

// const fsPromises = require("fs/promises");
// console.log("start");

// async function readAsyncronous() {
//   const result = await fsPromises.readFile("text.txt", "utf-8");
//   console.log(result);
// }

// readAsyncronous();
// console.log("end");

//callback function

// const fs = require("fs");
// console.log("start");
// async function readFileAsyncronouslyAsCallback() {
//   fs.readFile("text.txt", "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   });
// }
// readFileAsyncronouslyAsCallback();
// console.log("end");

// WRITE FILE
// const fs = require("fs");
// const fsPromises = require("fs/promises");
// fs.writeFileSync("text.txt", "Hello World!!!");
// fsPromises.writeFile("text.txt", "Hello World from Promises!!!").then(() => {
//   console.log("File written successfully");
// });
