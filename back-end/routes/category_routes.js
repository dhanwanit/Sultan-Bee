const express = require('express');

const storage = require('../helpers/storage');
 const CartCtrl = require('../controllers/categories');

const router = express.Router();


router.get('/fetch_category', CartCtrl.fetch_category);

router.get('/fetch_category_byName/:_id', CartCtrl.fetch_category_byName);

router.post('/insert_category_details', storage.single('category_image'), CartCtrl.insert_category_details);

router.put('/update_category_detail/:_id', storage.single('category_image'), CartCtrl.update_category_detail);

router.delete('/delete_category_detail/:_id', CartCtrl.delete_category_detail);

module.exports = router;