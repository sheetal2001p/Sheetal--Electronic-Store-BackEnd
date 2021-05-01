const mongoose  = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
      type:String      
    },
    lastName:{
     type:String
    },
    password:{
     type:String
    },
    email:{
     type:String
    },
    address:{
      type:String
    },
    userType:{
      type:String,
      default:"user"
    }

},{timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;