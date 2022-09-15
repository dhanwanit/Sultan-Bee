const mongoose = require('mongoose');
require("dotenv").config();

const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      // required: true
    },
    category_image: {
      type: String,
      // required: true
    },
    // restaurant: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "restaurants",
    //   // required: true,
    // }
  }
);

const category = mongoose.model('Categories', categorySchema);

module.exports = category;