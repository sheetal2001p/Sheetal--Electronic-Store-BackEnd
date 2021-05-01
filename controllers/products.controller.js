const Product = require("../models/products.model");

const addproducts = async (req, res) => {
    // console.log("RequestS??",req.body);
    const{name,price,model,qty,type,image} = req.body;
    try{
        const isExist = await Product.findOne({name});
        // console.log(isExist);
        if(isExist){
            return res.status(400).json({error: "Product already exist"});
        }
        const product = new Product(req.body);
        await product.save();

        res.status(201).json({product});
    }
    catch(error){ 
        return res.status(500).json({error:"Something went wrong!"});
    }

}
const getproducts = async(req,res)=> {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        console.log("Error :" + err);
    }
}

const deleteproduct = async(req,res)=>{
    const _id = req.params.id;
    try{
      const product = await Product.findByIdAndDelete({_id});
      if(!product){
        return res.json("product doesn't exist");
      }                                                                                                                                                          
      res.json("Product Deleted");
    }
    catch(err){
        console.log("Error:"+err);
    }
}
const updateproduct = async(req,res)=>{
    const _id = req.params.id;
    const data = req.body;
    try{
        const product = await Product.findByIdAndUpdate(
            {_id}, 
            {$set:data},
            {new:true}
        );
        if(!product){
            return res.status(200).json("Product Not Found");
          //   console.log("User Not Found");
        }
        res.status(200).json(product);
    }
    catch(err){
       console.log("Error :"+err);
    }
}
module.exports = {addproducts,getproducts,deleteproduct,updateproduct}