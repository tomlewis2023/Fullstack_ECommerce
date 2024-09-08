const jwt = require('jsonwebtoken')


function authToken(req, res, next) {
  try {
    const token = req.cookies?.token ;
    //This line tries to extract the JWT from the cookies of the incoming request
    console.log("token",token);
    
    if(!token){
        return res.status(200).json({
            message: "Please login",
            error: true,
            success: false
        })
    }
     //jwt.verify is used to verify the JWT using a secret key (process.env.TOKEN_SECRET_KEY) and the provided token.
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err,decoded){
        // console.log(err);
        // console.log(("decoded",decoded));
        
        if(err){
            // console.log(("error auth",err));
            
        }
        //If verification succeeds, it attaches the decoded user ID (decoded._id) to the req object and calls next() to pass control to the next middleware or route handler.
        req.userId = decoded?._id
        next()

    })

    console.log(token);
    
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}


module.exports = authToken