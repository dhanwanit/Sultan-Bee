const mongoose = require('mongoose');
require("dotenv").config();

const extraProductSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      // required: true
    },
    productPrice: {
      type: Number,
      // required: true
    },
    productImage: {
      type: String,
      // required: true
    },
    categorys: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "categories",
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

extraProductSchema.methods.addCategory = async function (category) {
    try {
        this.categorys = this.categorys.concat({ category });
        await this.save();
        return this.categorys;
    } catch (err) {
        console.log(err);
    }
  }

const ExtraProduct = mongoose.model('Extra_Product', extraProductSchema);

module.exports = ExtraProduct;