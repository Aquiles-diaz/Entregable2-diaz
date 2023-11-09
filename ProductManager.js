const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      products.push(product);
      await this.saveProducts(products);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  async getProduct(id) {
    try {
      const products = await this.getProducts();
      return products.find((product) => product.id === id);
    } catch (error) {
      console.error("Error getting product:", error);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products[index] = updatedProduct;
        await this.saveProducts(products);
        return true; // Indica que la actualización fue exitosa
      } else {
        console.error("Product not found");
        return false; // Indica que el producto no fue encontrado
      }
    } catch (error) {
      console.error("Error updating product:", error);
      return false; // Indica que ocurrió un error durante la actualización
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products.splice(index, 1);
        await this.saveProducts(products);
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error borrando producto :", error);
    }
  }

  async getProducts() {
    try {
      const data = await fs.promises.readFile(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading products:", error);
    }
  }
}
