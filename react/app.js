import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement("h1", {}, "Hello World");
const parent = document.getElementById("parent");

const root = ReactDOM.createRoot(parent);
root.render(heading);
