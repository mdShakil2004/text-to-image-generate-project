const express= require("express");
const {generateImage}=require("../controllers/imageControllers");
const { userAuth } = require("../middlewares/auth");



const imageRouter=express.Router();

imageRouter.post("/generate-image",userAuth,generateImage);

module.exports={imageRouter};