const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//hashing password
const hashPassword = async(user)=>{
  const hashedPassword = await bcrypt.hash(user.password,10);
  return hashedPassword;
}

//generate token
const generateToken = async(user)=>{  
  const token = await jwt.sign({_id:user._id.toString()},"newuser");
  return token;
}

const findByCredentials = async(email,password) =>{
    const user = await User.findOne({email});

    if(!user){
      return res.status(500).json({error:"Invalid user!"})
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(404).json({error:"Invalid user!"})
      }
      return user;
}
//Sign Up ApI for user and admin
const signup =async (req, res , next) => {
    // console.log("RequestS??",req.body);
    const{firstName,lastName,email,password,address} = req.body;
    // console.log(req.body)
    try{
        const isExist = await User.findOne({email});
        // console.log(isExist);
        if(isExist){
            return res.status(400).json({error: "User already exist"});
        }
        const user = new User(req.body);
        const hashedPassword = await hashPassword(user);
        user.password = hashedPassword;
        await user.save();

        const token = await generateToken(user);
        user.password = undefined;
        res.status(201).json({user,token});
    }
    catch(error){
        return res.status(500).json({error:"Something went wrong!"});
    }

}



//login API
const login = async(req,res,next)=>{
  const {email,password} = req.body;
  // console.log(email, " ", password)

  try{
    const user = await findByCredentials(email,password);
    // console.log(user);

    const token = await generateToken(user);
    // console.log(token)
    // user.password = undefined;
    res.status(201).json({user,token});

  }
  catch(e){
      res.status(400).json({error:"Something went wrong!"})
  }

}
module.exports = {signup,login}