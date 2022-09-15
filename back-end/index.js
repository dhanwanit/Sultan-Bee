const dotenv =require("dotenv");
dotenv.config({path:"./config.env"});
require("./db")
const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser')
// const mongoose = require('mongoose');
// const url = 'mongodb://localhost/Sultan-Bee'
const cors = require('cors');

const app = express();
app.use(cors());

const categoryRoute = require('./routes/category_routes');
const adminRoute = require('./routes/admin_routes');
const userRoute = require('./routes/user_routes');
const productRoute = require('./routes/product_routes');
const restaurantRoute = require('./routes/restaurant_routes');
const cartRoute = require('./routes/cart_routes');
const orderRoute = require('./routes/order_routes');

// mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser:true})
// const con = mongoose.connection

// con.on('open', () => {
  
//     console.log('connected...')
// })
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser())




app.use('/images', express.static('images'));

app.use('/api/admin', adminRoute);
app.use('/api/category', categoryRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/restaurant', restaurantRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);

app.listen(PORT,()=>{
  console.log(`server run on ${PORT}`);
})
