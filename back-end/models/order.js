const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
	{
		products: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'products',
				},
				product_name: {
					type: String,
				},
				product_quantity: {
					type: Number,
				},
			},
		],
		user: {
			userID: {
				type: String,
			},
			user_name: {
				type: String,
			},
			databaseID: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'users',
			},
		},
		isPurchased: {
			type: Boolean,
			default: false,
		},
		isDelivered: {
			type: Boolean,
			default: false,
		},
		shippingAddress: {
			type: 'object',
		},
		amount: {
			type: Number,
		},
		orderID: {
			type: String,
		},
		paymentID: {
			type: String,
		},
		paymentSignature: {
			type: String,
		},
		transactionTime: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;