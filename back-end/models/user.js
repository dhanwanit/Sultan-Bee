const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      // required: true
    },
    phone: {
      type: String,
      // required: true
    },
    password: {
      type: String,
      // required: true

    },
    allergy: {
      type: String,
      // required: true
    },
    name_on_card: {
      type: String,
      // required: true
    },
    card_no: {
      type: Number,
      // required: true
    },
    expire_date: {
      type: String,
      // required: true
    },
    cvv: {
      type: Number,
      // required: true
    },
    user_images: [
      {
        user_image: {
          type: String,
        }
      }
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    Active: {
      type:Boolean,
      default: 1
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
})

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, `${process.env.SECRET_KEY}`);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
}

userSchema.methods.addUserImage = async function (user_image) {
  try {
    this.user_images = this.user_images.concat({ user_image });
    await this.save();
    return this.user_images;
  } catch (err) {
    console.log(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;