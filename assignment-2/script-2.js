document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");
  const searchBar = document.getElementById("search-bar");
  const searchButton = document.getElementById("search-button");
  let products = [];

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data.products;
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Error fetching the products:", error);
    });

  const displayProducts = (products) => {
    productContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
          <img src="${product.thumbnail}" alt="${product.title}">
          <div class="product-info">
            <h2>${product.title}</h2>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price}</p>
            <p class="rating">Rating: ${product.rating} &#9733;</p>
          </div>
        `;

      productContainer.appendChild(productCard);
    });
  };

  searchBar.addEventListener("keydown", () => {
    const query = searchBar.value.trim().toLowerCase();
    if (query) {
      fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          const searchedProducts = data.products;
          displayProducts(searchedProducts);
        })
        .catch((error) => {
          console.error("Error searching for products:", error);
        });
    } else {
      displayProducts(products);
    }
  });
});
