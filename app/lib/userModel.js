const mongoose = require("mongoose");


const userModel = new mongoose.Schema({ 
    name:String,
    password:String,
    city:String,
    address:String,
    mobile:String,
    email :String, 

});

export const userSchema = mongoose.models.users
|| mongoose.model("users",userModel);