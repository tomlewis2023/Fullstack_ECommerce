const productModel = require("../models/productModel")

const filterProductController = async(req,res) =>{


    try {

        const categorylist = req.body.category || []

        const product = await productModel.find({
            category : {
                //filtering way in mongoose
                
                "$in" : categorylist
            }
        })

        res.json({
            data : product,
            message : "product",
            error : "false",
            success : true
        })


        
    } catch (err) {

        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        
    })
    }
}

module.exports = filterProductController