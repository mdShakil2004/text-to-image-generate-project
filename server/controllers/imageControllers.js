const { userModel } = require("../config/userConfig");
const FormData=require("form-data");
const axios=require("axios");



const generateImage = async (req, res) => {
    try { 
        const {userId,prompt} = req.body;
        // fetch user from database
        const user = await userModel.findById(userId);
        if(!user|| !prompt){
            return res.json({success:false, message:"messing details "});

            }
            // if the credit balance is zero 
            if(user.creditBalance===0 ||userModel.creditBalance<0){
                return res.json({success:false, message:"You have no credits balance left", creditBalance:user.creditBalance});
            }
            const formData=new FormData();
            formData.append("prompt",prompt);
            // formData.append("n",1);
            // formData.append("size","1024x1024");
           
            // create api call and get response as arraybuffer and convert the images into base64 
         const {data}=   await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API_KEY,
                  },
                 responseType: 'arraybuffer'
            });

            const base64Image = Buffer.from(data, 'binary').toString('base64'); // convert arraybuffer to base64
            const resultImage=`data:image/png;base64,${base64Image}`; // convert base64 to image url

            await userModel.findOneAndUpdate(user._id  , { creditBalance:user.creditBalance-1 });
            res.json({success:true, message:"image generated successfully",creditBalance:user.creditBalance-1,resultImage});




        
    } catch (error) {
        console.log(error.message); 
        req.json({success:false, message: "Internal Server Error" });
        
    }
}

module.exports={generateImage};