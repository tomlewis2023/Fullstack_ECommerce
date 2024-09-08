const userModel = require('../models/userModel')

async function userDetailController(req,res){

    //This line uses the findById method of the userModel to fetch the user document from the database based on the ID stored in req.userId. It uses await to wait for the result of the database query.
    try {
        
        
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "user details"
        })



       
        
        
    } catch (err) {

        res.status(400).json({
            message: err.message || err,
            error : true,
            success:false
        })
        
    }
}

module.exports = userDetailController