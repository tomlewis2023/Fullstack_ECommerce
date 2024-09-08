const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')


async function userSignupcontroller (req,res){

    try{
        //Extract Input and Initial Validation:
        const {fname,email, password} = req.body

        const user = await userModel.findOne({email})

        if(user){

            throw new Error("User already exists")

        }

        
        
        if(!fname){
            throw new Error("please provide name")
        }
        if(!email){
            throw new Error("please provide email")
        }
        if(!password){
            throw new Error("please provide password")
        }

        //bcrypt password
        //Generates a salt using bcrypt.genSaltSync(10) with a cost factor of 10.
          //Hashes the password with the generated salt using bcrypt.hashSync().

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hashSync(password,salt)

        if(!hashpassword){
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role:"GENERAL",
            password: hashpassword
        }

        
        const userData = new userModel(payload)
        const saveUser = await userData.save()
        //Creates a new user document using the userModel and saves it to the database.

        res.status(201).json({
            data:saveUser,
            success: true,
            error: false,
            message: "user created sucessfully"
        })


    }catch(err){

        res.json({
            message: err.message || err,
            err: true,         
            success:false,

        })

        





    }
}

module.exports = userSignupcontroller