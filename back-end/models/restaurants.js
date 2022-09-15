const mongoose = require('mongoose');
require("dotenv").config();

const restaurantsSchema = mongoose.Schema(
  {
    restaurant_name: {
      type: String,
      // required: true
    },
    restaurant_image: {
      type: String,
      // required: true
    },
    restaurant_rating: {
      type: String,
      // required: true
    },
    restaurant_distance: {
      type: String,
      // required: true
    },
    restaurant_subName: {
      type: String,
      // required: true
    },
    phone: {
      type: String,
      // required: true
    },
    address: {
      type: String,
      // required: true
    },
    category: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "categories",
        }
      } 
    ]
  }
);

restaurantsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

restaurantsSchema.set("toJSON", {
  virtuals: true,
});

restaurantsSchema.methods.addCategory = async function (category) {
  try {
      this.category = this.category.concat({ category });
      await this.save();
      return this.category;
  } catch (err) {
      console.log(err);
  }
}

const restaurants = mongoose.model('Restaurant', restaurantsSchema);

module.exports = restaurants;