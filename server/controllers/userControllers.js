const {userModel}=require("../config/userConfig");
// bcrypt
const bcrypt =require("bcrypt")
const jwt= require("jsonwebtoken");


const registerUser=async(req,res)=>{
    const {name,email,password,images}=req.body;
    console.log("Request body:", req.body);
    if(!name || !email || !password){
        return res.json({ success :false,Message:"all fields are required"});
    }
    
    


    try {
        const user1=await userModel.findOne({email});
        if(user1){
            return res.json({message:"user already exist"});
        }


        const salt=await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(password,salt);
        const userData={
            name,
            email,
            password:hashedPassword,
            
        }
        const newUser=new userModel(userData);
        const user =   await newUser.save();

        // create jwt token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({success:true,message:"user registered successfully",token, user:{name:user.name,email:user.email}});


        // res.status(200).json({message:"user registered successfully"});
    } catch (error) {
        console.log(error);
        res.json({message:"something went wrong"});
    }
    
}


const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.json({ success :false,Message:"all fields are required"});
    }
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({message:"something went wrong"});
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({success:true,message:"user logged in successfully",token, user:{name:user.name,email:user.email}});

    } catch (error) {
        console.log(error);
        res.json({message:"something went wrong"});

        
    }
}
/*
const userCredits=async(req,res)=>{
    try{
        const user=await userModel.findById(req.user.id);
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        const credits=user.credits;
        res.status(200).json({success:true,credits:user.creditBalance,user:{name:user.name,email:user.email}});

    } catch(error)
    { 
        console.log(error);
        res.status(400).json({message:"something went wrong in credit balance "});

    }

}
*/


const userCredits=async(req,res)=>{
    try{ 
        
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        res.json({success:true,credits:user.creditBalance,user:{name:user.name,email:user.email}});
    } catch(error){
        // console.log(error);
        res.json({success:false, message:"something went wrong "});
    }
}


const userFetching=async(req,res)=>{

    try {
        
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"user not found"});
        }
        
      
        // Convert the profile image buffer to Base64 for the response
        const profileImageBase64 = user.profileImage ? user.profileImage.toString('base64') : null;

        // Format the Base64 string with the data URL prefix
        const formattedProfileImage = profileImageBase64 ? `data:image/jpeg;base64,${profileImageBase64}` : null;

        res.json({success:true,user:{name:user.name,email:user.email,profileImage:formattedProfileImage}});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"something went wrong in "});
        
    }
}









module.exports={registerUser,loginUser,userCredits,userFetching};
