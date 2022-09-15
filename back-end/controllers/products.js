const Product = require("../models/product");
const Category = require("../models/category");
const Restaurant = require('../models/restaurants');

exports.get_product = async (req, res) => {
    // localhost:3000/api/v1/products?categories=77765,47883
    const category = await Product.find(); 
    res.status(200).send(category);
  }

// exports.get_product_byId = async (req, res) => {
//     // localhost:3000/api/v1/products?categories=77765,47883
//     const category = await Product.find({_id: req.params._id}); 
//     res.status(200).send(category);
//     console.log("product value",category);
//   }  

exports.get_product_byId = async (req, res) => {
  // localhost:3000/api/v1/products?categories=77765,47883
  const category = await Product.find({_id: req.params._id}); 
  res.status(200).send(category)
//   res.status(200).json({
    

// _id:category._id,
// product_description: category.product_description,
// product_image:category.product_image, 
// product_offer: category.product_offer,
// product_price:category.product_price,
// product_rating: category.product_rating,
// product_strike_price:category.product_strike_price, 
// qty:category.qty

    
//   });
  console.log("product value",category);
}  
  

exports.insert_product = async (req, res) => {
    if(!req.file) {
      return res.status(500).send({ message: 'Upload fail'});
      } else {
        const {product_name,product_description,product_price,product_image,product_rating,product_strike_price,product_offer,isFeatured,dateCreated} = req.body;
          req.body.product_image = 'http://localhost:8080/images/' + req.file.filename;
          
          Product.create(req.body, function (err, user) {
              if (err) {
                  console.log(err);
                  return next(err);
              }
              res.json({user});
          });
    }
}

exports.product = async (req, res, next) => {
           req.body.category = await Category.findOne({_id: req.body.category});
           req.body.restaurant = await Restaurant.findOne({_id: req.body.restaurant});
          // console.log(req.params.product_id);
          const product = await Product.findOne({ _id: req.params.product_id });

          if (product) {
            const userMessage = await product.addCategory(req.body.category._id,req.body.restaurant._id);
            const test = await product.save();
      
            res.status(201).json(test);
          }
}


exports.fetch_product_by_categoryAndRestId = async (req, res) => {
    const cat = req.params.category_id;
    const rest = req.params.rest_id;
  
    const productList = await Product.find({"categorys.category" : cat, "categorys.restaurant" : rest});
    console.log(productList);
    if (!productList) {
      res.status(500).json({ success: false });
    }
    res.status(200).send(productList);
}


exports.update_product = async (req, resp) => {
  // console.log(req.file.filename);
  try {
    if(req.file){
    const url = req.protocol + '://' + req.get("host");
    req.body.product_image = url + "/images/" + req.file.filename;
    }
      const _id = req.params._id;
      const profileData  =  await Product.findByIdAndUpdate( _id , req.body , {
          new:true
      } );
      resp.status(201).send(profileData);


} catch (error) {
    
    resp.status(404).send(error);
}
}

exports.delete_product_detail = (req, resp) => {
  Product.findByIdAndRemove(req.params._id)
    .then((product) => {
      if (product) {
        return resp
          .status(200)
          .json({ success: true, message: "the product deleted" });
      } else {
        return resp
          .status(404)
          .json({ success: false, message: "product not found" });
      }
    })
    .catch((err) => {
      return resp.status(400).json({ success: false, error: err });
    });
}



