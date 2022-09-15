const authenticate = require('../middleware/authenticate');
const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cartItem');
const razorpay = require('../razorpay');
const randomString = require('randomstring');

// Routes
// exports.checkout = async (req, res) => {
// 	try {
// 		const user = await Cart.findOne(
// 			{
// 				'users.user_id': req.userID,
// 			},
// 			{
// 				__v: 0,
// 				createdAt: 0,
// 				updatedAt: 0,
// 			}
// 		)
// 			.populate({ path: 'Cart.products', select: 'product_price', strictPopulate: false })
// 			.exec();
// 			// const Cart1 = await Cart.find();
// 			console.log("user data",user);
// 		let total = 0;
// 		if (user) {
// 			let cartItems = [];
// 			user.products.forEach((item,index) => {
// 				total += user.products[index].product_price * user.products[index].product_quantity;
// 					console.log("total-amount",  total);
// 					cartItems.push({
// 					product_id: user.products[index]._id,
// 					product_quantity: user.products[index].product_quantity,
// 					});
// 			});

// 			total += total * 0.05;

// 			let order = await Order.findOne({
// 				'user.userID': req.userID,
// 			});

// 			const razorpayOptions = {
// 				amount: parseFloat(total.toFixed(2)) * 100,
// 				payment_capture: 1,
// 				currency: 'INR',
// 				receipt: randomString.generate(15),
// 			};
// 			const newRazorPayOrder = await razorpay.orders.create(razorpayOptions);

// 			if (!order || (order && order.isPurchased)) {
// 				order = await Order.create({
// 					user: {
// 						userID: req.userID,
// 						databaseID: user._id,
// 					},
// 					products: cartItems,
// 					amount: parseFloat(total.toFixed(2)),
// 					orderID: newRazorPayOrder.id,
// 				});
// 			} else {
// 				await Order.updateOne(
// 					{
// 						_id: order._id,
// 					},
// 					{
// 						$set: {
// 							products: cartItems,
// 							amount: parseFloat(total.toFixed(2)),
// 							orderID: newRazorPayOrder.id,
// 						},
// 					}
// 				);
// 			}

// 			return res.status(200).json({
// 				order_static_id: order._id,
// 				order_details: newRazorPayOrder,
// 			});
// 		}
// 	} catch (e) {
// 		console.log(e);
// 		return res.status(400).json({
// 			msg: 'Server Error',
// 		});
// 	}
// }

// Verify the Order
exports.checkout_verify_order = async (req, res) => {
	try {
		const { paymentResponse, orderStaticID, shippingAddress } = req.body;

		const order_doc = await Order.find({
			'user.userID': req.userID,
			orderID: paymentResponse.razorpay_order_id,
			_id: orderStaticID,
		});
	
		if (!order_doc)
			return res.status(400).json({
				msg: 'Invalid Request or Data you are requesting is not valid',
			});

		await Order.updateOne(
			{
				_id: orderStaticID,
			},
			{
				$set: {
					isPurchased: true,
					transactionTime: new Date(),
					orderID: paymentResponse.razorpay_order_id,
					paymentID: paymentResponse.razorpay_payment_id,
					paymentSignature: paymentResponse.razorpay_signature,
					shippingAddress: shippingAddress,
				},
			}
		);

		const order = await Order.findOne(
			{
				_id: orderStaticID,
			},
			{
				customer: 0,
				captureID: 0,
				createdAt: 0,
				__v: 0,
			}
		)
			.populate({ path: 'Order.products.product_id', strictPopulate: false })
			.exec();

		order.products.forEach(async (item) => {
			await Product.updateOne(
				{ _id: item.product_id._id },
				{ $set: { stock: item.product_id.stock - item.product_quantity } }
			);
		});

		return res.status(200).json({
			msg: 'Order Successfully Created',
			orderDetails: order,
		});
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode).json({
			error: JSON.parse(err.message),
		});
	}
}

// View Order Details
exports.user_orders = async (req, res) => {
	try {
		const orders = await Order.find(
			{
				'user.userID': req.userID,
				isPurchased: true,
			},
			{
				captureID: 0,
				user: 0,
				createdAt: 0,
				__v: 0,
			}
		)
			.sort({
				updatedAt: -1,
			})
			.populate({
				path: 'Order.products.product_id',
				select: '-description -createdAt -updatedAt -__v',
				strictPopulate: false
			})
			.populate({
				path: 'user',
				select: '-description -createdAt -updatedAt -__v',
				strictPopulate: false
			})
			.exec();

		return res.json({
			orders,
		});

	} catch (err) {
		console.log(err);
		return res.status(err.statusCode).json({
			error: JSON.parse(err.message),
		});
	}

}

// // Admin Orders
exports.admin_orders = async (req, res) => {
	try {
		// if (!req.siteAdmin) {
		// 	return res.status(403).json({
		// 		msg: 'Unauthorized Access',
		// 	});
		// }

		const orders = await Order.find(
			{
				isPurchased: true,
			},
			{
				__v: 0,
				createdAt: 0,
				'user.userID': 0,
			}
		)
			.sort({
				updatedAt: -1,
			})
			.populate({
				path: 'Order.products.product_id',
				select: '-description -createdAt -updatedAt -__v',
				strictPopulate: false
			})
			.populate({
				path: 'Order.user.databaseID',
				select: 'details -_id',
				strictPopulate: false
			})
			.exec();

		return res.json({
			orders,
		});
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode).json({
			error: JSON.parse(err.message),
		});
	}
}

// // Update Delivery Status
exports.admin_orders_update = async (req, res) => {
	try {
		// if (!req.siteAdmin) {
		// 	return res.status(403).json({
		// 		msg: 'Unauthorized Access',
		// 	});
		// }

		const orderDeliveryCheck = await Order.findOne(
			{
				_id: req.body.orderStaticID,
			},
			{
				isDelivered: 1,
			}
		);

		if (orderDeliveryCheck.isDelivered) {
			return res.status(400).json({
				msg: 'Order already delivered to customer',
			});
		}

		await Order.updateOne(
			{
				_id: req.body.orderStaticID,
			},
			{
				$set: {
					isDelivered: true,
				},
			}
		);

		const order = await Order.findOne(
			{
				_id: req.body.orderStaticID,
			},
			{
				updatedAt: 1,
				isDelivered: 1,
			}
		);

		return res.json({
			order,
			msg: 'Order updated Successfully',
		});
	} catch (err) {
		console.log(err);
		return res.status(err.statusCode).json({
			error: JSON.parse(err.message),
		});
	}
}


exports.allOrders = async (req, res) => {
	const orders = await Order.find();
	res.status(200).send(orders);
}



exports.checkout = async (req, res) => {
	try {
		const userdeatail = await Cart.findOne(
			{
				'users.user_id': req.userID,
			},
			{
				__v: 0,
				createdAt: 0,
				updatedAt: 0,
			}
		)
			.populate({ path: 'Cart.products', select: 'product_price', strictPopulate: false })
			.populate({ path: 'Cart.products', select: 'product_name', strictPopulate: false })
			.populate({ path: 'Cart.users', select: 'user_name', strictPopulate: false })
			.exec();
		// const Cart1 = await Cart.find();
		console.log("user data", userdeatail);
		let total = 0;
		if (userdeatail) {
			let cartItems = [];
			userdeatail.products.forEach((item, index) => {
				total += userdeatail.products[index].product_price * userdeatail.products[index].product_quantity;
				console.log("total-amount", total);
				cartItems.push({
					product_id: userdeatail.products[index]._id,
					product_name: userdeatail.products[index].product_name,
					product_quantity: userdeatail.products[index].product_quantity,
				});
			});

			total += total * 0.05;

			let order = await Order.findOne({
				'user.userID': req.userID,
			});

			const razorpayOptions = {
				amount: parseFloat(total.toFixed(2)) * 100,
				payment_capture: 1,
				currency: 'INR',
				receipt: randomString.generate(15),
			};
			const newRazorPayOrder = await razorpay.orders.create(razorpayOptions);

			if (!order || (order && order.isPurchased)) {
				order = await Order.create({
					user: {
						userID: req.userID,
						user_name: userdeatail.users.user_name,
						databaseID: userdeatail._id,
					},
					products: cartItems,
					amount: parseFloat(total.toFixed(2)),
					orderID: newRazorPayOrder.id,
				});
			} else {
				await Order.updateOne(
					{
						_id: order._id,
					},
					{
						$set: {
							products: cartItems,
							amount: parseFloat(total.toFixed(2)),
							orderID: newRazorPayOrder.id,
						},
					}
				);
			}

			return res.status(200).json({
				order_static_id: order._id,
				order_details: newRazorPayOrder,
				user_details: userdeatail
			});
		}
	} catch (e) {
		console.log(e);
		return res.status(400).json({
			msg: 'Server Error',
		});
	}
}



exports.deliverOrder = async (req, res) => {
	const orderid = req.body.orderid
	try {
		const order = await Order.findOne({ _id: orderid });
		order.isDelivered = true;
		await order.save();
		res.status(200).send('Order delivered success');
	} catch (error) {
		res.status(400).json({
			message: "Something went wrong",
			error: error.stack,
		});
	}
};