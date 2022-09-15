const User = require("../models/user");
const Order = require("../models/order");
const bcrypt = require("bcrypt");
require("dotenv").config();
const asyncHandler = require("express-async-handler");
const authenticate = require('../middleware/authenticate');
// exports.register = async (req, res) => {

//     const { full_name, email, phone, password, allergy, name_on_card, card_no, expire_date, cvv } = req.body;

//     try {
//       const userExist = await User.findOne({ email: email, phone: phone });
//       if (userExist) {
//           return res.status(422).json({ error: "Email and phone is already Exits" });
//       } else {
//           const user = new User({ full_name, email, phone, password, allergy, name_on_card, card_no, expire_date, cvv });

//           const userRegister = await user.save();
//           console.log(userRegister);
//           if (userRegister) {
//               return res.status(201).json({ message: "User Registered" });
//           }
//           else {
//               res.status(500).json({ error: "Failed to registered" });
//           }
//       }
//   }
//   catch (error) {
//       console.log(error);
//   }
//   }

// exports.login = async (req, res) => {
//     try {
//         let token;
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ error: "please fill all field." });
//         }

//         const userLogin = await User.findOne({ email: email });

//         if (userLogin) {
//             const isMatch = await bcrypt.compare(password, userLogin.password);
//             // console.log(isMatch);

//             if (!isMatch) {
//                 res.json({ error: "Invalid Credintials Pass" });
//             } else {
//                 token = await userLogin.generateAuthToken();
//                 console.log(token);

//              res.cookie("jwttoken", token, {
//                 expires: new Date(Date.now() + 25892000000),
//                 httpOnly: true
//             })
//                 res.json({ message: "login successfully" });
//             }
//         } else {
//             res.json({ error: "Invalid Credintials" });
//         }

//     }
//     catch (error) {
//         console.log(error);
//     }
// }

exports.register = asyncHandler(async (req, res) => {
  const {
    full_name,
    email,
    phone,
    password,
    allergy,
    name_on_card,
    card_no,
    expire_date,
    cvv,
  } = req.body;
  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400);
    throw new Error("user Exist");
  }
  console.log(req.body);
  const user = await User.create({
    full_name,
    email,
    phone,
    password,
    allergy,
    name_on_card,
    card_no,
    expire_date,
    cvv,
  });

  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      allergy: user.allergy,
      name_on_card: user.name_on_card,
      card_no: user.card_no,
      expire_date: user.expire_date,
      cvv: user.cvv,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});


exports.updateActiveValue = async (req, resp) => {
  try {
    const { Active } = req.body;
    const _id = req.params.user_id;
    const activeData = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    resp.status(201).send(activeData);
  } catch (error) {
    resp.status(404).send(error);
  }
}

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const testing_data = await User.find({ email });
  if(testing_data[0].Active == true){
 
  const user = await User.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("invalid email and password");
    } else {
      let token = await user.generateAuthToken();
      console.log(token);

      let cookie = await res.cookie("jwttoken", token, {
        // expires: new Date(Date.now() + (30*24*3600000)),          //set 1 for month
        expiresIn: "10h",
        httpOnly: true, 
        Secure: false,
      });
      console.log(cookie);
      res.json({
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        allergy: user.allergy,
        name_on_card: user.name_on_card,
        card_no: user.card_no,
        expire_date: user.expire_date,
        cvv: user.cvv,
        Active:user.Active,
        token,
      });
    }
  } else {
    res.status(401);
    throw new Error("invalid email and password");
  }
}else{
  res.status(400).send({message: "user is disable"});
}
});

exports.update = async (req, resp) => {
  try {
    const _id = req.params._id;
    console.log(_id);
    const profileData = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    resp.status(201).send(profileData);
  } catch (error) {
    resp.status(404).send(error);
  }
};

// exports.get_single_user = async (req, resp) => {
//     var id = req.params._id;
//     let data =  await User.find({_id : id });
//     resp.send(data);
// }

//update the user details

exports.updateprofile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userID._id);

  if (user) {
    user.full_name = req.body.full_name || user.full_name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    console.log(updatedUser);
    res.json({
      _id: updatedUser._id,
      full_name: updatedUser.full_name,
      email: updatedUser.email,
    });
  } else {
    // res.status(404)
    throw new Error("User not found");
  }
});

exports.insert_user_image = async (req, res) => {
  if (!req.file) {
    return res.status(500).send({ message: "Upload fail" });
  } else {
    const user = await User.findOne({ _id: req.userID });
    console.log(user);
    req.body.user_image =
      "http://localhost:8080/images/" + req.file.filename;
    await user.addUserImage(req.body.user_image);
    await user.save();
    res.status(200).json(user);
  }
};

exports.get_single_user = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userID._id);
  if (user) {
    res.json({
      _id: user._id,
      full_name: user.full_name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("token not found");
  }
});


exports.logout = (req, res, next) => {
  // req.logout();
  // res.redirect('/');

  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}


// exports.myorders_byID = async (req, res, next) => {
//   const id = req.params._id;

//   const myorder = await Order.findById({_id : id});
//  res.status(200).send(myorder);
// }


// exports.get_myorders = async (req, res, next) => {
//   const orders = await Order.find({'user.userID' : req.userID});
//   res.status(200).send(orders);
// }


