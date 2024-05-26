document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      data.products.forEach((product) => {
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
    })
    .catch((error) => {
      console.error("Error fetching the products:", error);
    });
});
