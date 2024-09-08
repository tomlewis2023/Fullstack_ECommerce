const addToCartModel = require("../models/cartProduct")

const deleteAddToCartProduct = async (req,res) => {


    try {

        const currentUserId = req.userId 
        const addToCartProductId = req.body._id
        console.log('Deleting product with ID:', addToCartProductId); // Log product ID

        const deleteProduct = await addToCartModel.deleteOne({_id : addToCartProductId})

        res.json({
            message: "Product Deleted from cart",
            error : false,
            success: true,
            data : deleteProduct
        })
        
    } catch (err) {
        console.error('Error in deleteAddToCartProduct:', err); // Log errors
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        
    })
}}

module.exports = deleteAddToCartProduct