const express = require('express');

const storage = require('../helpers/storage');
const Cart = require('../controllers/cart');

const router = express.Router();

router.post('/addCart', Cart.addCart);

router.post('/cart', Cart.cart);

module.exports = router;