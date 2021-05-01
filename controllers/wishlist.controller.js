const Wishlist = require("../models/wishlist.models");

const addtowishlist = async (req, res) => {
    const {product} = req.query;
    const user = req.user;
    const _id = user._id;

    try{
        const wishlist = new Wishlist({product:product,owner:_id});
        await wishlist.save();
        res.json({message:"Added to wishlist"});
    }
    catch(error){
        return res.status(500).json({error:"Something went wrong!"});
    }

}
const mywishlist = async (req, res) => {
    const user = req.user;
    const _id = user._id;
    try{
        const wishlist = await Wishlist.find({owner:_id}).populate("product").populate("user");
        res.status(200).json(wishlist);
    }
    catch(error){
        return res.status(500).json({error:"Something went wrong!"});
    }

}

const deletewishitem = async(req,res)=>{
    const _id = req.params.id;
    console.log(_id)
    try{
      const product = await Wishlist.findByIdAndDelete({_id});
    //   console.log(product)
      if(!product){
        return res.json("product doesn't exist in wishlist");
      }                                                                                                                                                          
      res.json("Product Deleted from wishlist");
    }
    catch(err){
        console.log("Error:"+err);
    }
}
module.exports = {addtowishlist,mywishlist,deletewishitem}