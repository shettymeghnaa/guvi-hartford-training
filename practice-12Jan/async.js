// //you need to display id,title,price,stock and brand from https://dummyjson.com/products in the format of table using promises
// // Fetch products using Promise
// fetch("https://dummyjson.com/products")
//   .then(response => response.json())
//   .then(data => {
//     const products = data.products;

//     // Create table
//     const table = document.createElement("table");
//     table.border = "1";

//     // Create header row
//     const headerRow = document.createElement("tr");
//     ["ID", "Title", "Price", "Stock", "Brand"].forEach(text => {
//       const th = document.createElement("th");
//       th.innerText = text;
//       headerRow.appendChild(th);
//     });
//     table.appendChild(headerRow);

//     // Create data rows
//     products.forEach(product => {
//       const row = document.createElement("tr");

//       ["id", "title", "price", "stock", "brand"].forEach(key => {
//         const td = document.createElement("td");
//         td.innerText = product[key];
//         row.appendChild(td);
//       });

//       table.appendChild(row);
//     });

//     // Append table to body
//     document.body.appendChild(table);
//   })
//   .catch(error => console.error("Error fetching data:", error));

//create shopping cart with id, category,title,price, stock dynamically using async await in console.table

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}

let products = [];
let cart = [];

// fetch products
async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  products = data.products.map(p => ({
    id: p.id,
    category: p.category,
    title: p.title,
    price: p.price,
    stock: p.stock
  }));

  console.table(products);
}

// add to cart
function addToCart(productId, quantity) {
  const product = products.find(p => p.id === productId);

  if (!product) {
    console.log("❌ Product not found");
    return;
  }

  if (quantity > product.stock) {
    console.log("❌ Insufficient stock");
    return;
  }

  product.stock -= quantity;

  cart.push({
    id: product.id,
    title: product.title,
    price: product.price,
    quantity,
    total: product.price * quantity
  });

  console.log("✅ Added to cart");
  console.table(cart);
  console.table(products);
}

// main flow
async function startShopping() {
  await fetchProducts();

  const id = Number(await ask("Enter product ID: "));
  const qty = Number(await ask("Enter quantity: "));

  addToCart(id, qty);
  rl.close();
}

startShopping();
