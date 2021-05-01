const Order = require("../models/order.model");

const placeOrder = async (req, res) => {
    const {product} = req.query;
    const user = req.user;
    const _id = user._id;

    try{
        const order = new Order({product:product,owner:_id});
        await order.save();
        res.json({message:"Order placed successfully"});
    }
    catch(error){
        return res.status(500).json({error:"Something went wrong!"});
    }
}
const myOrders = async (req, res) => {
    const user = req.user;
    const _id = user._id;
    try{
        const orders = await Order.find({owner:_id}).populate("product").populate("owner");
        res.status(200).json(orders);
    }
    catch(error){
        return res.status(500).json({error:"Something went wrong!"});
    }

}
const getallOrders = async(req,res)=> {
    try {
        const orders = await Order.find().populate("product").populate("owner");
        // console.log(orders)
        res.status(200).json(orders);
    }
    catch (err) {
        console.log("Error :" + err);
    }
}

const deleteOrder = async(req,res)=>{
    const _id = req.params.id;
    try{
      const order = await Order.findByIdAndDelete({_id});
      if(!order){
        return res.json("Order doesn't exist");
      }                                                                                                                                                          
      res.json("Order Deleted");
    }
    catch(err){
        console.log("Error:"+err);
    }
}
module.exports = {placeOrder,myOrders,getallOrders,deleteOrder}