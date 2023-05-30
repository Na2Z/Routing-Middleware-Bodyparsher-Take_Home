const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');

const upload = multer({ dest: 'uploads/' });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/upload', upload.single('image'), productController.uploadProductImage);

module.exports = router;
