const express = require('express');

const storage = require('../helpers/storage');
const Restaurant = require('../controllers/restaurant');

const router = express.Router();

// For Admin
router.post('/insert_restaurant', Restaurant.insert_restaurant);

router.post('/restaurant', storage.single('restaurant_image'), Restaurant.restaurant);

router.get('/fetch_restaurant', Restaurant.fetch_restaurant);

router.get('/fetch_restaurant_byId/:_id', Restaurant.fetch_restaurant_byId);

router.put('/update_restaurant_detail/:_id', storage.single('restaurant_image'), Restaurant.update_restaurant_detail);

router.delete('/delete_restaurant_detail/:_id', Restaurant.delete_restaurant_detail);

// For Front-end
router.get('/fetch_restaurant_by_categoryId/:category', Restaurant.fetch_restaurant_by_categoryId);

module.exports = router;