const express = require('express');

const storage = require('../helpers/storage');
 const User = require('../controllers/user');
 const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/register', User.register);

router.post('/login', User.login);

router.put('/update/:_id', User.update);

router.put('/updateprofile',authenticate,User.updateprofile);

router.get('/get_single_user/:_id',authenticate,  User.get_single_user);

router.get('/get_single_user',authenticate , User.get_single_user);

router.get('/logout', User.logout);

router.post('/insert_user_image', authenticate,storage.single('user_image'), User.insert_user_image);

router.put('/updateActiveValue/:user_id', User.updateActiveValue);

// router.get('/myorders/:_id', User.myorders_byID);

// router.get('/get_myorders',authenticate, User.get_myorders);

module.exports = router;