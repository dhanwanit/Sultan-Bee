const User = require('../models/user');
const Admin = require('../models/admin');
const Category = require('../models/extracategory');
const ExtraProduct = require('../models/extraproduct');
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');

// exports.getCart = async(req, res) => {
//     const user = await Cart.find();
//     res.status(200).json(user);
//   };

exports.get_user_data = async (req, res) => {
    // const date = new Date();
    // console.log(date);
    let data = await User.find();
    res.status(200).send(data);
}

exports.get_single_user = async (req, resp) => {
    var id = req.params._id;
    let data = await User.find({ _id: id });
    resp.send(data);
}

exports.update = async (req, resp) => {
    try {
        const _id = req.params._id;
        const profileData = await User.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        resp.status(201).send(profileData);

    } catch (error) {
        resp.status(404).send(error);
    }
}


exports.user_delete = function (req, res) {
    console.log(req.params._id);
    User.findByIdAndRemove(req.params._id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
}


exports.update_admin_profile = async (req, resp) => {
    try {
        if (req.file) {
            const url = req.protocol + '://' + req.get("host");
            req.body.admin_images = url + "/images/" + req.file.filename;
        }

        const _id = req.params._id;
        // update it with hash
        // req.body.password = await bcrypt.hash(req.body.password, 12)
        // then update
        const profileData = await Admin.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        resp.status(201).send(profileData);
    } catch (error) {

        resp.status(404).send(error);
    }

}


exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })

    if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password)
        if (!isMatch) {
            res.status(401);
            throw new Error("invalid email and password")
        } else {
            let token = await admin.generateAuthToken();
            console.log(token);

            let cookie = await res.cookie("jwttoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true, Secure: false
            })
            console.log(cookie);
            res.json({
                _id: admin._id,
                admin_name: admin.admin_name,
                email: admin.email,
                admin_images: admin.admin_images,
                token
            });
        }
    } else {
        res.status(401);
        throw new Error("invalid email and password")
    }
});


exports.register = asyncHandler(async (req, res) => {
    const { admin_name, email, password } = req.body;
    const existAdmin = await Admin.findOne({ email });

    if (existAdmin) {
        res.status(400);
        throw new Error("admin Exist");
    }
    console.log(req.body);
    const admin = await Admin.create({ admin_name, email, password });

    console.log(admin);

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            admin_name: admin.admin_name,
            email: admin.email,
            password: admin.password
        });


    } else {
        res.status(400);
        throw new Error("invalid data");
    }
});




//Extra categories 
exports.insertcategory = async (req, res, next) => {
    if (!req.file) {
        return res.status(500).send({ message: 'Upload fail' });
    } else {
        const { categoryName } = req.body;
        req.body.categoryImage = 'http://localhost:8080/images/' + req.file.filename;

        Category.create(req.body, function (err, user) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json({ user });
        });
    }
}


exports.getcategory = async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
}

exports.getcategory_byName = async (req, res) => {
    const category = await Category.findOne({ _id: req.params._id });

    if (!category) {
        res
            .status(500)
            .json({ message: "the category with the given ID not found" });
    }
    res.status(200).send(category);
}

exports.updatecategory = async (req, resp) => {
    try {
        if (req.file) {
            const url = req.protocol + '://' + req.get("host");
            req.body.categoryImage = url + "/images/" + req.file.filename;
        }
        const _id = req.params._id;
        const profileData = await Category.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        resp.status(201).send(profileData);
    } catch (error) {
        resp.status(404).send(error);
    }
}


exports.deletecategory = async (req, res) => {
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


//Extra Products
exports.getProduct = async (req, res) => {
    const category = await ExtraProduct.find();
    res.status(200).send(category);
}

exports.getProductById = async (req, res) => {
    // localhost:3000/api/v1/products?categories=77765,47883
    const category = await ExtraProduct.find({ _id: req.params._id });
    res.status(200).send(category);
}


exports.insertProduct = async (req, res) => {
    if (!req.file) {
        return res.status(500).send({ message: 'Upload fail' });
    } else {
        const { productName, productPrice, productImage, isFeatured, dateCreated } = req.body;
        req.body.productImage = 'http://localhost:8080/images/' + req.file.filename;

        ExtraProduct.create(req.body, function (err, user) {
            if (err) {
                console.log(err);
                return next(err);
            }
            res.json({ user });
        });
    }
}

exports.updateProduct = async (req, resp) => {
    // console.log(req.file.filename);
    try {
        if (req.file) {
            const url = req.protocol + '://' + req.get("host");
            req.body.productImage = url + "/images/" + req.file.filename;
        }
        const _id = req.params._id;
        const profileData = await ExtraProduct.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        resp.status(201).send(profileData);
    } catch (error) {
        resp.status(404).send(error);
    }
}

exports.deleteProduct = (req, resp) => {
    ExtraProduct.findByIdAndRemove(req.params._id)
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


exports.product = async (req, res, next) => {
    req.body.category = await Category.findOne({ categoryName: req.body.category });

    const rest = await ExtraProduct.findOne({ _id: req.body.product_id });

    if (rest) {
        const userMessage = await rest.addCategory(req.body.category._id);
        const test = await rest.save();

        res.status(201).json(test);
    }
}





//For frontend
exports.fetch_product_by_categoryId = async (req, res) => {
    console.log(req.params.category);
    const productList = await ExtraProduct.find({ "categorys.category": req.params.category });
    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(productList);
}





//Query document mongodb
//clauses and conditions
// exports.getproductprice = async (req, res) => {
//     try {
//         let data = await ExtraProduct.find({ $and: [{ productPrice: { $gt: 20 } }, { productPrice: { $lt: 50 } }], });
//         // let data = await ExtraProduct.find({ $where: "productPrice < 20" });
//         // let data = await ExtraProduct.find({ productPrice: { $gte: 20 }, $and: [{ productPrice: { $lt: 50 } }] });

//         if (!data) {
//             res.status(500).json({ success: false });
//         }
//         res.status(200).send(data);
//     } catch (error) {
//         console.log(error);
//     }
// }