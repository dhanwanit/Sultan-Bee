const Category = require('../models/category');


// Add Menu
exports.insert_category_details = async (req, res, next) => {
    if(!req.file) {
      return res.status(500).send({ message: 'Upload fail'});
      } else {
         const { category_name } = req.body;
          req.body.category_image = 'http://localhost:8080/images/' + req.file.filename;
          
          Category.create(req.body, function (err, user) {
              if (err) {
                  console.log(err);
                  return next(err);
              }
              res.json({user});
          });
    }
}

exports.fetch_category = async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
      res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
}

exports.fetch_category_byName = async (req, res) => {
    const category = await Category.findOne({_id: req.params._id});
  
    if (!category) {
      res
        .status(500)
        .json({ message: "the category with the given ID not found" });
    }
    res.status(200).send(category);
}

exports.update_category_detail = async (req, resp) => {
  try {
    if(req.file){
    const url = req.protocol + '://' + req.get("host");
    req.body.category_image = url + "/images/" + req.file.filename;
    }
      const _id = req.params._id;
      const profileData  =  await Category.findByIdAndUpdate( _id , req.body , {
          new:true
      } );
      resp.status(201).send(profileData);


} catch (error) {
    
    resp.status(404).send(error);
}
}


exports.delete_category_detail = async (req, res) => {
    Category.findByIdAndRemove(req.params._id)
      .then((category) => {
        if (category) {
          return res
            .status(200)
            .json({ success: true, message: "the category deleted" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "categry not found" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ success: false, error: err });
      });
}