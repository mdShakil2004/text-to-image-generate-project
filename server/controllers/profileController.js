
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../config/userConfig");



const UserUpdateProfile=async(req,res)=>{
 try {

    const {userId} = req.body;
    const {name, email, password} = req.body;
        // Check if userId is defined
        if (!userId) {
            return res.status(400).json({ success: false, message: "User  ID is required" });
        }
   

    const existUser=await userModel.findById(userId);
    if(!existUser){
        return res.json({ success: false, message: "User  not found" });

    } 
     if(req.body.name)
     {
        existUser.name=name;
     }
     if(req.body.email){

         existUser.email=email;
     }
     if(req.body.password){
        
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        existUser.password=hashedPassword;
     }


    
    if(req.file||existUser.profileImage==null ||existUser.profileImage===null){
        {   
            existUser.profileImage=req.file.buffer;
        }
    }

    
   
  
    const updatedUser=await existUser.save();
   
    
        // Convert the profile image buffer to Base64 for the response
        const profileImageBase64 = updatedUser.profileImage ? updatedUser .profileImage.toString('base64') : null;

        const formattedProfileImage = profileImageBase64 ? `data:image/jpeg;base64,${profileImageBase64}` : null;

    return res.json({
        success: true,
        message: "User  data updated successfully",
        user: {
            name: updatedUser.name, 
            email: updatedUser.email,
            profileImage: formattedProfileImage
        }
    });


 } catch (error) {
   
    return res.json({success:false,message:"Something went wrong"});
    
 }

}
module.exports={UserUpdateProfile};