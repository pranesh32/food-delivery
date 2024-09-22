const mongoose = require("mongoose");


const restaurantModel = new mongoose.Schema({ 
    name:String,
    password:String,
    city:String,
    address:String,
    contact:Number,
    email :String, 
});

export const restaurantSchema = mongoose.models.restaurants
|| mongoose.model("restaurants",restaurantModel);