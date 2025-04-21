const mongoose=require("mongoose");


// creating user schema 
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},  // no duplicate email allowed
    password:{type:String,required:true},
    creditBalance:{
        type:Number,
        default:5
    },
    profileImage:{
        type:Buffer,
        contentType:String,
        // add default image
        default :null
        
        
    }
}, {timestamps:true});

const userModel=  mongoose.models.user /** if user model is already created */ ||   mongoose.model("user",userSchema); // creating user model
module.exports={userModel};