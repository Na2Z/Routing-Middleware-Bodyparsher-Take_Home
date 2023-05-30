const fs = require('fs');

const productModel = {
  filePath: './data/products.json',

  getAllProducts() {
    const products = fs.readFileSync(this.filePath);
    return JSON.parse(products);
  },

  getProductById(productId) {
    const products = this.getAllProducts();
    return products.find(product => product.id === productId);
  },

  saveProduct(product) {
    const products = this.getAllProducts();
    products.push(product);
    fs.writeFileSync(this.filePath, JSON.stringify(products));
  },

  updateProduct(productId, updatedProduct) {
    const products = this.getAllProducts();
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, ...updatedProduct };
      }
      return product;
    });
    fs.writeFileSync(this.filePath, JSON.stringify(updatedProducts));
  },

  deleteProduct(productId) {
    const products = this.getAllProducts();
    const updatedProducts = products.filter(product => product.id !== productId);
    fs.writeFileSync(this.filePath, JSON.stringify(updatedProducts));
  },
};

module.exports = productModel;
