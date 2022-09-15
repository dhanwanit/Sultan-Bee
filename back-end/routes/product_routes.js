const express = require('express');

const storage = require('../helpers/storage');
 const Product = require('../controllers/products');

const router = express.Router();

router.get('/get_product', Product.get_product);

router.get('/get_product_byId/:_id', Product.get_product_byId);

router.post('/product/:product_id', Product.product);

router.post('/insert_product',storage.single('product_image'), Product.insert_product)

router.put('/update_product/:_id',storage.single('product_image'), Product.update_product);

router.delete('/delete_product_detail/:_id', Product.delete_product_detail);

router.get('/fetch_product_by_categoryAndRestId/:category_id/:rest_id', Product.fetch_product_by_categoryAndRestId);

module.exports = router;