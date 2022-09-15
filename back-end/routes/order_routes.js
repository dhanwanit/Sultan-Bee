const express = require('express');

const storage = require('../helpers/storage');
 const Order = require('../controllers/orders');
 const AddOrder = require('../controllers/orderController');
 const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/checkout',authenticate, Order.checkout);

router.post('/addOrderItems',authenticate, AddOrder.addOrderItems);

router.get('/user_orders',authenticate, Order.user_orders);

router.get('/admin_orders',authenticate,Order.admin_orders)

router.post('/checkout_verify_order', authenticate, Order.checkout_verify_order);

router.post('/admin_orders_update',authenticate ,Order.admin_orders_update);

router.get('/allorders',Order.allOrders);

router.post('/deliverorder',Order.deliverOrder);

module.exports = router;