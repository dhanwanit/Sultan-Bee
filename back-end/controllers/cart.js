const Cart = require('../models/cartItem');
const User = require('../models/user');
const Product = require('../models/product');
require("dotenv").config();

// exports.addCart = async (req, res) => {
//   const {user_id,product_id,product_quantity,product_price} = req.body;

//   try {
//     let cart = await Cart.findOne({ user_id });
//     if (cart) {
//       //cart exists for user
//       let itemIndex = cart.products.findIndex(p => p.product_id == product_id);
//       // console.log(itemIndex);
//       let product_TotalPrice = product_price * product_quantity;
//       if (itemIndex > -1) {
//         //product exists in the cart, update the quantity
//         let productItem = cart.products[itemIndex];
//         productItem.product_quantity = product_quantity;
//         productItem.product_TotalPrice = product_TotalPrice;
//         cart.products[itemIndex] = productItem;
//       } else {
//         //product does not exists in cart, add new item
        
//         cart.products.push({ 
//                         product_id,
//                         product_quantity,
//                         product_price,
//                         product_TotalPrice,
//                     });
//       }
//       cart = await cart.save();
//       return res.status(201).send(cart);
//     } else {
//       //no cart for user, create new cart
//       const newCart = await Cart.create({
//         user_id,
//         products: [
//           {
//             product_id:product_id,
//             product_quantity:product_quantity,
//             product_price:product_price,
//             product_TotalPrice:product_price * product_quantity,
//           }
//         ]
//       });

//       return res.status(201).send(newCart);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong");
//   }
// }




exports.addCart = async (req, res, next) => {

  const { user_id, product_id } = req.body;
  let data = null;
  
  const quantity = Number.parseInt(req.body.product_quantity);
  console.log(quantity);
  let cart = await Cart.findOne({ 'users.user_id': user_id}); 
  const productDetails = await Product.findById(product_id);
  const UserDetails = await User.findById({_id: user_id});
//   console.log("productDetails", productDetails)
  
  //-- Check if cart Exists and Check the quantity if items -------
  if (cart){
      let indexFound = cart.products.findIndex(p => p.product_id == product_id);
      console.log("Index", indexFound)
      //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
      if (indexFound != -1) {
          cart.products[indexFound].product_quantity = cart.products[indexFound].product_quantity + quantity;
          cart.products[indexFound].product_TotalPrice = cart.products[indexFound].product_quantity * productDetails.product_price;
          cart.products[indexFound].product_price = productDetails.product_price;
          cart.products[indexFound].product_name = productDetails.product_name;
          cart.subTotal = cart.products.map(item => item.product_TotalPrice).reduce((acc, curr) => acc + curr);
      }
      //----Check if Quantity is Greater than 0 then add item to items Array ----
      else if (quantity > 0) {
          cart.products.push({
            product_id: product_id,
            product_name: productDetails.product_name,
            product_quantity: quantity,
            product_price: productDetails.product_price,
            product_TotalPrice: parseInt(productDetails.product_price * quantity).toFixed(2),
          })
          cart.subTotal = cart.products.map(item => item.product_TotalPrice).reduce((acc, curr) => acc + curr);
      }
      //----if quantity of price is 0 throw the error -------
      else {
          return res.status(400).json({
              code: 400,
              message: "Invalid request"                
          })
      }
  
      data = await cart.save();
  }
  //------if there is no user with a cart then it creates a new cart and then adds the item to the cart that has been created---------
  else {
      const cartData = {
          users:{
            user_id: user_id,
            user_name: UserDetails.full_name
          },
          products: [{
              product_id: product_id,
              product_quantity: quantity,
              product_name: productDetails.product_name,
              product_TotalPrice: parseInt(productDetails.product_price * quantity),
              product_price: productDetails.product_price,
          }],
          subTotal: parseInt(productDetails.product_price * quantity)
      }
      cart = new Cart(cartData);
      data = await cart.save();
  }
  
  return res.status(200).send({ 
      code: 200,
      message: "Add to Cart successfully!",
      data: data
  });
  } 


exports.cart = async function(req, res){
  const product = await Cart.find({_id: req.body.cart_id})
  res.status(201).json(product);
}


// exports.removeCartItem = (req, res, next) => {
// 	Cart.update({'users.user_id' : req.params.userId}, { $pull: { products : {category: "Home" }}}, function (err, data) {
// 		if (err) res.send(err)
// 		else res.send(data)
//   })
// }



