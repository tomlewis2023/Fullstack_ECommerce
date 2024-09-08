const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function usersignincontroller(req,res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("please provide email");
    }
    if (!password) {
      throw new Error("please provide password");
    }

    //find user from DB

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("user not found");
    }

    //check login password with db stored password

    const checkpassword = await bcrypt.compare(password, user.password);
    console.log(checkpassword);

    //implement  jwt token if login username password is correct

    if (checkpassword) {

       const tokenData ={

        _id: user._id,
        email: user.email

       }
       const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 *8 });
       const tokenOption = {
        httpOnly :true,
        secure: true,
        sameSite : 'None'
       }

       res.cookie("token",token,tokenOption).status(200).json({
        message: "Login sucessfully",
        data: token,
        success:true,
        error: false
       })
        
    } else {
        throw new Error("Plesae check password");
        
        
    }


    
  } catch (err) {
    res.json({
      message: err.message || err,
      err: true,
      success: false,
    });
  }
}

module.exports = usersignincontroller
