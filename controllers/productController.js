const fs = require("fs");
const productModel = require("../models/productModel");

const productController = {
  getAllProducts(req, res) {
    const products = productModel.getAllProducts();
    res.json(products);
  },

  getProduct(req, res) {
    const { id } = req.params;
    const product = productModel.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  },

  createProduct(req, res) {
    const { id, nama, harga, barcode } = req.body;
    const product = { id, nama, harga, barcode };
    productModel.saveProduct(product);
    res.status(201).json({ message: "Product created successfully" });
  },

  updateProduct(req, res) {
    const { id } = req.params;
    const { nama, harga, barcode } = req.body;
    const updatedProduct = { nama, harga, barcode };
    productModel.updateProduct(id, updatedProduct);
    res.json({ message: "Product updated successfully" });
  },

  deleteProduct(req, res) {
    const { id } = req.params;
    productModel.deleteProduct(id);
    res.json({ message: "Product deleted successfully" });
  },

  uploadProductImage(req, res) {
    const { id } = req.params;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const imagePath = `./public/image/${id}.jpg`;

    try {
      if (Buffer.isBuffer(imageFile.buffer)) {
        fs.writeFileSync(imagePath, imageFile.buffer);
        res.json({ message: "Product image uploaded successfully" });
      } else {
        throw new Error("Invalid image file");
      }
    } catch (error) {
      console.error(error);
      fs.unlinkSync(imageFile.path);
      return res.status(400).json({ error: "Invalid image file" });
    }
  },
};

module.exports = productController;
