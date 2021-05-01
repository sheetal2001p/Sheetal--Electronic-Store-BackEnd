const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//authentication for routes
const auth = async(req,res,next)=>{
  try{
      const token = req.header("Authorization").replace("Bearer ","");

      // console.log("Token", token)
      const decoded = jwt.verify(token,"newuser");
      const user = await User.findOne({_id:decoded._id});
     if(!user){
         res.status(401).json({
             error:"Please authenticate!",
         });
     } 
    //  if(user.userType!="admin"){
    //      return res.status(400).json({
    //          message:"User Access Denied"
    //      })
    //  }
     req.token = token;
     req.user = user;
     next();
  }
  catch(error){
    res.status(500).json({
        error:"Something went wrong!!"
    });
  }
};
module.exports = {auth};