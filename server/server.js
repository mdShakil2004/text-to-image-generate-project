const express = require('express')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const {connectDB}=require('./modules/mongodb')
const { userRouter } = require('./routes/userRoutes')
const { imageRouter } = require('./routes/imageRoute') 

dotenv.config({path:'./secure/.env'})




const app = express()
app.use(cors()); 


// adding body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// add view engine 
app.set('view engine', 'ejs');
// add static folder 
app.use(express.static(path.join(__dirname, 'public')));

//add routes
app.use("/api/user",userRouter)
app.use("/api/image",imageRouter)




// Define a route that responds with "Hello"
app.get('/', (req, res) => {
    res.send('Hello');
});













const PORT = process.env.PORT || 3000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

