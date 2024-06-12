const http = require("node:http"); // that signals to Node.js that the http module should be loaded from the core http module in Node.js.

const app = http.createServer((req, res) => {
  console.log("request received", req.url);
  console.log(Object.keys(req));
  const time = new Date();
  res.setHeader("time-of-backend", time.toISOString());
  //   res.setHeader("Content-Type", "application/json");
  //   res.end(JSON.stringify({ message: "Hello World!" }));

  res.setHeader("Content-Type", "text/html");
  //   res.end(`
  //         <html>
  //             <head>
  //                 <title>My First Page</title>
  //                 <style>
  //                     body{
  //                         background-color: #f0f0f0;
  //                         padding: 20px;
  //                     }
  //                 </style>
  //             </head>
  //             <body>
  //                 <h1>Hello from my Node.js Server!</h1>
  //             </body>
  //         </html>
  //         `);

  const fsPromises = require("node:fs/promises");
  fsPromises.appendFile(
    "log.txt",
    `Request URL: ${req.url}  ${new Date().toISOString()}\n`
  );
  fsPromises.readFile("home.html", "utf-8").then((data) => {
    res.end(data);
  });
});

// 1000 - 9999 is the port number
app.listen(2000, () => {
  console.log("Server is running on port 3000");
});
