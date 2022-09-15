const express = require('express');
// const Authenticate = require('../middleware/authenticate');
const storage = require('../helpers/storage');
const Admin = require('../controllers/admin');

const router = express.Router();

router.get('/get_user_data', Admin.get_user_data);

router.get('/get_single_user/:_id', Admin.get_single_user);

router.put('/update/:_id', Admin.update);

router.put('/update_admin_profile/:_id',storage.single('admin_images'), Admin.update_admin_profile);

router.delete('/user_delete/:_id', Admin.user_delete);

router.post('/login', Admin.login);

router.post('/register', Admin.register);

//extra categories routes
router.get('/getcategory', Admin.getcategory);

router.get('/getcategory_byName/:_id', Admin.getcategory_byName);

router.post('/insertcategory', storage.single('categoryImage'), Admin.insertcategory);

router.put('/updatecategory/:_id', storage.single('categoryImage'), Admin.updatecategory);

router.delete('/deletecategory/:_id', Admin.deletecategory);


//extra products routes
router.get('/getproducts', Admin.getProduct);

router.get('/getproduct_byId/:_id', Admin.getProductById);

router.post('/insertproduct',storage.single('productImage'), Admin.insertProduct)

router.put('/updateproduct/:_id',storage.single('productImage'), Admin.updateProduct);

router.delete('/deleteproduct/:_id', Admin.deleteProduct);

//to add category id
router.post('/product', Admin.product);


// For Front-end
router.get('/fetch_product_by_categoryId/:category', Admin.fetch_product_by_categoryId);


// router.get('/getproductprice',Admin.getproductprice);

module.exports = router;