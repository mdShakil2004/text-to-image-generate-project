import React, { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import {motion} from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import {FormData} from "form-data";

const UserProfile = () => {
   const {userProfile,setShowLogin,setUserProfile,setToken ,user,backendUrl,token,setUser,setUserProfilePic }=useContext(AppContext)
  

 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image , setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // State for profile image

  const [nameUpdate, setNameUpdate] = useState(false);
  const [emailUpdate, setEmailUpdate] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [imageUpdate, setImageUpdate] = useState(false);

  const [isSaveDisabled, setIsSaveDisabled] = useState(false);



  useEffect(() => {
    // Disable the save button if passwords do not match
    const passwordsMatch = (password === confirmPassword) && (password.length>0 && confirmPassword.length>0);
    setIsSaveDisabled(!passwordsMatch);
    if(nameUpdate || emailUpdate  || imageUpdate){
      setIsSaveDisabled(false);
    }
    
}, [password, confirmPassword, nameUpdate, emailUpdate, imageUpdate]); // Run this effect whenever password or confirmPassword changes


useEffect (() => {
  const fetchUserProfile = async () => {
    try {
        const response = await axios.get(backendUrl+'/api/user/fetchUser', {headers:{token}}); // Adjust the endpoint as necessary
        // console.log(response.data)
        setUser(response.data.user);
        setProfileImage(response.data.user.profileImage);
        setUserProfilePic(true);
    } catch (error) {
       toast.error(" server issue please try again "); 
    }
};

fetchUserProfile();
}, []);

  const updateUser = async (e) => {
    e.preventDefault();

    


    const formData = new FormData();
    formData.append("userId", user.Id); // Ensure you are appending the userId
   
    formData.append("name", name);
    formData.append("email", email);
    if (password) {
        formData.append("password", password);
    }
    if (image) {
        formData.append("image", image);
    }
    formData.append("token", token); // Ensure you are appending the token

    try {
         // Send the FormData object in the request
         const { data } = await axios.put(backendUrl + "/api/user/updateProfile", formData, {
          headers: {
              'Content-Type': 'multipart/form-data', // Set the content type for FormData
              'token': token // Include the token in headers
          }
      });




     
      if(data.success){
        // Check if user data exists before accessing properties
        if (data.user) {
          setUser(data.user);
          setProfileImage(data.user.profileImage); // Assuming the backend returns the updated image in Base64
         
          setImage(data.user.profileImage);
          toast.success("Profile updated successfully!");
          setUserProfile(false);
      } else {
          toast.error("User  data not found in response.");
      }




       
       

        
      }
      else{
        toast.error(data.message);  // toast notification 
       

      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);

      
    }


  }

  

  return ( 
     <div className="absolute  right-3 top-10 z-10    bg-white/20 backdrop-blur-md  hover:scale-[1.02] transition-all md:w-1/3 lg:w-1/4 xl:w-1/5">
   {userProfile ?(
     <motion.form  onSubmit={ updateUser}
         initial={{ opacity: 0.2,y: 25}}
          transition={{duration: 0.8}}
          whileInView={{y: 0, opacity: 1}}
          viewport={{once: true}}
     className="relative flex flex-col gap-3  p-12 md:p-6 lg:p-10  rounded-lg shadow-md  border px-12 py-14  cursor-pointer" >
       <div className="  flex items-center p-2.5 pt-2 pb-2  rounded-full bg-blue-600 justify-center ">
        
         {imageUpdate ? ( <div className=" flex items-center  py-9  px-11  rounded-full bg-blue-600 justify-center text-sm  " >
        
          <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])}  className=" absolute size-20 bg-white/30 rounded-full w-16 h-16 border cursor-pointer " /> </div> )
        
        :(   
           <div className=" flex items-center p-1   h-16  rounded-full bg-blue-600 justify-center">
            {profileImage ?(

              <img className="  w-16 bg-cover h-16   p-1 rounded-full object-cover  shadow-sm border cursor-pointer " src={profileImage} alt="" />
            ):(
              <img className="  w-16 bg-cover h-16   p-1 rounded-full object-cover  shadow-sm border cursor-pointer " src={assets.profile_icon} alt="" />
              
            )}
            <img   onClick={() => setImageUpdate(true)}  src={assets.pencil_icon} width={18} alt="" className=" absolute mt-6   rounded-full border  ml-12 cursor-pointer " />
           </div>
        )
        } 
       </div>
      <div className="   flex flex-row  items-center justify-center ">
      { nameUpdate ? ( <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="text-gray-600 pl-3 py-1.5 text-sm rounded-full border-2 border-blue-500 focus:border-blue-700 bg-white" />):(<p className=" ml-2 border pl-6 px-10  py-1.5 mt-2 rounded-full gap-2 flex flex-row  items-center ">👋, {user.name} <img onClick={() => setNameUpdate(true)} src={assets.pencil_icon} width={15} alt="" className="ml-2 cursor-pointer" /> </p>) } 
       </div>

       <div className=" border  bg-transparent px-1 py-1.5 mt-2 rounded-full gap-2 flex flex-row  items-center justify-center ">
      { emailUpdate ? ( <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="text-gray-600  pl-3 py-1.5 text-sm rounded-full border-2 border-blue-500 focus:border-blue-700 bg-white "disabled={true} />):(<p className="text-gray-600 pl-4 px-1  py-1.2 text-sm flex items-center justify-center"> {user.email} <img onClick={() => setEmailUpdate(true)} src={assets.pencil_icon} width={15} alt="" className="ml-3 opacity-50 cursor-not-allowed cursor-pinter " /> </p>) } 
       </div>
      

     {passwordUpdate ? ( <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"     className="text-gray-600 pl-3 py-1.5 text-sm rounded-full border-2 border-blue-500 focus:border-blue-700 bg-white" />)    : (<div className="border bg-blue-500 px-1 py-1.5 mt-2 rounded-full gap-2 flex flex-row  items-center "> <p className=" ml-2 text-md flex text-white items-center"> change password <img onClick={() => setPasswordUpdate(true)} src={assets.pencil_icon} width={15} alt="" className="ml-4 cursor-pointer" /> </p> </div>) } 
      {passwordUpdate ? (( <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=" conform password" className="text-gray-600 pl-3 py-1.5 text-sm rounded-full border-2 border-blue-500 focus:border-blue-700 bg-white"/>)):null}
       
    {/* creating bottom when user clicked on it save the data */}
  
  {nameUpdate || emailUpdate  || passwordUpdate || imageUpdate ? (
    
    <button 
    type="submit" 
    className={`text-white py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
    disabled={isSaveDisabled}>
    Save
</button>
  ):null}
    

    </motion.form>
    ): setShowLogin(true) } 
              <img onClick={() => setUserProfile(false)} className="absolute top-5 right-5 cursor-pointer scale-105 transition-all duration-300 hover:scale-110"  src={assets.cross_icon} alt="" />

    </div> 
  )
}

export default UserProfile;
