const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    product:{
        type:String,
        ref:"Product"
    },
    owner:{
      type:Schema.Types.ObjectId,
      ref:"User"   
    },
    qty:{
      type:Number,
      default:1
    },
},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;