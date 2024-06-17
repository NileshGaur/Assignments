// const http = require("node:http"); // that signals to Node.js that the http module should be loaded from the core http module in Node.js.

// const app = http.createServer((req, res) => {
//   console.log("request received", req.url);
//   console.log(Object.keys(req));
//   const time = new Date();
//   res.setHeader("time-of-backend", time.toISOString());
//   //   res.setHeader("Content-Type", "application/json");
//   //   res.end(JSON.stringify({ message: "Hello World!" }));

//   res.setHeader("Content-Type", "text/html");
//   //   res.end(`
//   //         <html>
//   //             <head>
//   //                 <title>My First Page</title>
//   //                 <style>
//   //                     body{
//   //                         background-color: #f0f0f0;
//   //                         padding: 20px;
//   //                     }
//   //                 </style>
//   //             </head>
//   //             <body>
//   //                 <h1>Hello from my Node.js Server!</h1>
//   //             </body>
//   //         </html>
//   //         `);

//   const fsPromises = require("node:fs/promises");
//   fsPromises.appendFile(
//     "log.txt",
//     `Request URL: ${req.url}  ${new Date().toISOString()}\n`
//   );
//   fsPromises.readFile("home.html", "utf-8").then((data) => {
//     res.end(data);
//   });
// });

// // 1000 - 9999 is the port number
// app.listen(2000, () => {
//   console.log("Server is running on port 2000");
// });

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

const http = require("node:http");
const fsPromises = require("node:fs/promises");
const url = require("node:url");

const cards = async () => {
  let cardTemplate = await fsPromises.readFile("./pages/card.html", "utf-8");

  const productsText = await fsPromises.readFile("./data.json", "utf-8");
  const products = JSON.parse(productsText);

  const resultArray = products.map((ele) => {
    let cardText = cardTemplate;
    const title = ele.title;
    const description = ele.description;
    const image = ele.thumbnail;
    cardText = cardText.replace("$cardTitle$", title);
    cardText = cardText.replace("$cardDescription$", description);
    cardText = cardText.replace("$imageSrc$", image);
    cardText = cardText.replace("$Link$", `/details?id=${ele.id}`);

    return cardText;
  });

  const result = resultArray.join("\n");
  return result;
};
const homePageResponse = async (res) => {
  const data = await fsPromises.readFile("./pages/homePage.html", "utf-8");
  res.end(data);
};

const productsPageResponse = async (res) => {
  let cardText = await cards();
  const data = await fsPromises.readFile("./pages/productsPage.html", "utf-8");
  const productPageHtml = data.replace("#root#", cardText);
  res.end(productPageHtml);
};

const detailsPageResponse = async (res, id) => {
  console.log(id);
  const productsText = await fsPromises.readFile("./data.json", "utf-8");
  const products = JSON.parse(productsText);
  const product = products.find((ele) => ele.id === parseInt(id));

  if (product) {
    let data = await fsPromises.readFile(
      "./pages/productDetails.html",
      "utf-8"
    );
    data = data.replace("$Title$", product.title);
    data = data.replace("$description$", product.description);
    data = data.replace("$image$", product.thumbnail);
    data = data.replace("$Price$", product.price);

    const productDetailsHtml = data;
    res.end(productDetailsHtml);
  } else {
    res.end("Product not found");
  }
};

const app = http.createServer((req, res) => {
  const createLogs = (req) => {
    fsPromises.appendFile(
      "./log.txt",
      `Request URL: ${req.url}  ${new Date().toISOString()}\n`
    );
  };
  createLogs(req);

  res.setHeader("Content-Type", "text/html");
  const route = req.url;
  const { pathname, query } = url.parse(route, true);

  switch (pathname) {
    case "/": {
      homePageResponse(res);
      break;
    }
    case "/products": {
      productsPageResponse(res);
      break;
    }
    case "/details": {
      detailsPageResponse(res, query.id);
      break;
    }
    default: {
      res.end("404 Page not found");
      break;
    }
  }
});
app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
