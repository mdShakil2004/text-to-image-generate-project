const mongoose = require("mongoose")
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../secure', '.env') }); // Load .env from the secure folder


// connect the mongodb
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB database");
        })
        await mongoose.connect(`${process.env.MONGODB_URL}`);
      
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
 connectDB();
module.exports = { connectDB }; 






