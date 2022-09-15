const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const cartSchema = mongoose.Schema(
  {
    users:
    {
        user_id: {
          type: String,
        //   ref: "users",
        },
        user_name: {
          type: String,
        //   ref: "users",
        }
      },
    products : [
        {
            product_id: {
                type: String,
                // ref: "products",
            },
            product_name: {
              type: String,
            },
            product_quantity: {
            type: Number,
            default: 0
            },
            product_price: {
            type: Number,
            default: 0
            },
            product_image: {
              type: String,
              // default: 0
              },
            product_TotalPrice: {
              type: Number,
              default: 0
            },
        }
    ],
    subTotal: {
      default: 0,
      type: Number,
    },
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// cartSchema.methods.addCart = async function (product_id, product_quantity, product_price, product_TotalPrice) {
//     try {
//         this.products = this.products.concat({ product_id, product_quantity, product_price, product_TotalPrice });
//         await this.save();
//         return this.products;
//     } catch (err) {
//         console.log(err);
//     }
//   }

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;