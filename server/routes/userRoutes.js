const express=require("express");
const multer =require("multer");
const {registerUser,loginUser, userCredits,userFetching,displayEjs}=require("../controllers/userControllers");
const { userAuth } = require("../middlewares/auth");
const {UserUpdateProfile}=require("../controllers/profileController");
const userRouter=express.Router();




// Set up multer storage
const storage = multer.memoryStorage(); // Store files in memory as Buffer
const upload = multer({ storage: storage });






userRouter.post("/register",registerUser);// register user
userRouter.post("/login",loginUser);// login user
userRouter.get("/credits",userAuth ,userCredits);// login user
userRouter.put("/updateProfile",upload.single("image"),userAuth ,UserUpdateProfile);// update profile
userRouter.get("/fetchUser",userAuth,userFetching);// fetch user details
module.exports={userRouter};