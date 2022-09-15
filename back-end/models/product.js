const mongoose = require('mongoose');
require("dotenv").config();

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      // required: true
    },
    product_description: {
      type: String,
      // required: true
    },
    product_price: {
      type: String,
      // required: true
    },
    product_image: {
      type: String,
      // required: true
    },
    product_rating: {
      type: String
    },
    product_strike_price : {
      type: String
    },
    product_offer : {
      type: String
    },
    qty : {type : Number , required : true, default : 1 , min : 1},
    categorys: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "categories",
        },
        restaurant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "restaurants",
        }
      } 
    ],
    isFeatured: { 
        type: Boolean, 
        default: false 
    },
    dateCreated: { 
        type: Date, 
        default: Date.now 
    },
  }
);

// productSchema.virtual("id").get(function () {
//     return this._id.toHexString();
//   });
  
//   productSchema.set("toJSON", {
//     virtuals: true,
//   });

  productSchema.methods.addCategory = async function (category, restaurant) {
    try {
        this.categorys = this.categorys.concat({ category, restaurant });
        await this.save();
        return this.categorys;
    } catch (err) {
        console.log(err);
    }
  }

const Product = mongoose.model('Product', productSchema);

module.exports = Product;