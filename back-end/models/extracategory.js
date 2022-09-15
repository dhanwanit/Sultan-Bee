const mongoose = require('mongoose');
require("dotenv").config();

const extracategorySchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      // required: true
    },
    categoryImage: {
      type: String,
      // required: true
    },
  }
);

const category = mongoose.model('Extra_Categories', extracategorySchema);

module.exports = category;