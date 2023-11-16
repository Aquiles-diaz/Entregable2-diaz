const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Agregar un producto 
productManager.addProduct({ id: 1, name: 'Producto 1' });

// Ruta para lista de productos
app.get('/products', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
