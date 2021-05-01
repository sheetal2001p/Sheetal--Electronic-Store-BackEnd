const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
      type:String      
    },
    price:{
     type:Number
    },
    model:{
     type:String
    },
    qty:{
      type:Number
    },
    type:{
      type:String
    },
    productURL:{
      type:String
    },
    image:{
      type:String
    }
},{timestamps:true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;