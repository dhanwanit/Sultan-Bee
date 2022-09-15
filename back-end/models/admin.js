const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()


const adminSchema = mongoose.Schema(
  {
    admin_name: {
      type: String,
      // required: true
    },
    email: {
      type: String,
      // required: true
    },
    password: {
      type: String,
      // required: true

    },
    admin_images: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
  }
);

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
})

adminSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, `${process.env.SECRET_KEY}`);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
}

// adminSchema.methods.addAdminImage = async function (admin_image) {
//   try {
//     this.admin_images = this.admin_images.concat({ admin_image });
//     await this.save();
//     return this.admin_images;
//   } catch (err) {
//       console.log(err);
//   }
// }

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;