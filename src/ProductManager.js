const express = require("express");
const bodyParser = require("body-parser");
const ProductManager = require("./ProductManager"); 

const app = express();
const port = 8080;

app.use(bodyParser.json());

const productsManager =  new ProductManager("products.json");

// Obtiene todos los productos
app.get("/products", async (req, res) => {
  const products = await productsManager.getProducts();
  res.json(products);
});

// Obtiene un producto por ID
app.get("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await productsManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Agrega un nuevo producto
app.post("/products", async (req, res) => {
  const newProduct = req.body;

  try {
    const addedProduct = await productsManager.addProduct(newProduct);
    res.json(addedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualiza un producto por ID
app.put("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedData = req.body;

  const updatedProduct = await productsManager.updateProducts(productId, updatedData);

  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Elimina un producto por ID
app.delete("/products/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const deletionResult = await productsManager.deleteProducts(productId);

  if (deletionResult) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
