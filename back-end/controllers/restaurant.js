


const Restaurant = require('../models/restaurants');
const Product = require('../models/product');
const Category = require('../models/category');

exports.restaurant = async (req, res, next) => {
    if(!req.file) {
        return res.status(500).send({ message: 'Upload fail'});
        } else {
            req.body.restaurant_image = 'http://localhost:8080/images/' + req.file.filename;
            
            Restaurant.create(req.body, function (err, user) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.json({user});
            });
      }
}

exports.insert_restaurant = async (req, res, next) => {
    // if(!req.file) {
    //     return res.status(500).send({ message: 'Upload fail'});
    //     } else {
            req.body.category = await Category.findOne({category_name: req.body.category});
          
            const rest = await Restaurant.findOne({ _id: req.body.restaurant_id });

            if (rest) {
              const userMessage = await rest.addCategory(req.body.category._id);
              const test = await rest.save();
        
              res.status(201).json(test);
            }
}

exports.fetch_restaurant = async (req, res) => {
  const restaurantList = await Restaurant.find();
  // console.log(categoryList);
  if (!restaurantList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(restaurantList);
}

exports.fetch_restaurant_byId = async (req, res) => {
    const restaurantList = await Restaurant.find({_id: req.params._id});
    // console.log(categoryList);
    if (!restaurantList) {
      res.status(500).json({ success: false });
    }
    res.status(200).send(restaurantList);
}

exports.fetch_restaurant_by_categoryId = async (req, res) => {
  console.log(req.params.category);
    const restaurantList = await Restaurant.find({"category.category" : req.params.category});
    if (!restaurantList) {
      res.status(500).json({ success: false });
    }
   res.status(200).send(restaurantList);
}


exports.update_restaurant_detail = async (req, res) => {
  // console.log(req.file.filename);
  try {
    if(req.file){
    const url = req.protocol + '://' + req.get("host");
    req.body.restaurant_image = url + "/images/" + req.file.filename;
    }
      const _id = req.params._id;
      const profileData  =  await Restaurant.findByIdAndUpdate( _id , req.body , {
          new:true
      } );
      res.status(201).send(profileData);


} catch (error) {
    
    res.status(404).send(error);
}
}


exports.delete_restaurant_detail = async (req, res) => {
    Restaurant.findByIdAndRemove(req.params._id)
      .then((category) => {
        if (category) {
          return res
            .status(200)
            .json({ success: true, message: "the restaurant deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "restaurant not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
}