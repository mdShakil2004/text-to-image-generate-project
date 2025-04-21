const jwt = require("jsonwebtoken");

/*
const userAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
}; 
    */



const userAuth = async (req, res, next) => {
    const {token} = req.headers;
        if(!token)
        {
            return res.json({success:false, error: "Please authenticate. again" });
        }
    try {
        
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecoded.id)
        { 
            req.body.userId = tokenDecoded.id;
           
        }
        else{
            return res.json({success:false, message: "Please authenticate. again" });

        }
      
       next();
       
    } catch (error) {
        res.json({success:false, message: "Please authenticate.", error: error.message});
    }
};






module.exports = {userAuth};

/** 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjFhMWFmMzk1ODRjYTliYjk5MjllNSIsImlhdCI6MTczNDQ1MTYzMSwiZXhwIjoxNzM0NTM4MDMxfQ.IilF7zQWKi1l3VteXkWCXTqizUcDS6qjCbYR4--OsP0"
 
 */