const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        product_name: {
          type: String,
          // require:true
        },
        product_image: {
          type: String,
          //  require:true
        },
        product_price: {
          type: String,
          // require:true
        },
        qty: {
          type: Number,
          //  require:true
        },
        products: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required:true,
      ref: "User",
    },

    shippingAddress: {
      address: {
        type: String,
        // require:true
      },
      city: {
        type: String,
        // require:true
      },
      postalCode: {
        type: String,
        // require:true
      },
      country: {
        type: String,
        // require:true
      },
    },

    paymentMethod: {
      type: String,
      // require:true
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    taxPrice: {
      type: Number,
      // require:true,
      default: 0.0,
    },

    shippingPrice: {
      type: Number,
      // require:true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      // require:true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      // require:true,
      default: false,
    },
    paidAt: {
      type: Date,
    },

    isDelivered: {
      type: Boolean,
      // require:true,
      default: false,
    },
    DeliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Orderes = mongoose.model("Orderes", orderSchema);
module.exports = Orderes;
