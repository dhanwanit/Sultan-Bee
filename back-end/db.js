const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
}).then(()=>{
    console.log("connection is success");
}).catch((error)=>console.log(error));
