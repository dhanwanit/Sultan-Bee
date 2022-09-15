const Razorpay = require('razorpay');
require('dotenv').config();

var instance = new Razorpay({
	key_id: "rzp_test_swjngC7bb76uNa",
	key_secret: "2nkQ3SHcZabGe0bbjxQ6Kckh",
});

module.exports = instance;