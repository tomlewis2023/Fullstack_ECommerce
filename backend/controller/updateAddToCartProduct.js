const addToCartModel = require("../models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.userId; // Assuming userId is available in req object
    const addToCartProductId = req.body._id; // Product ID from request body
    const qty = req.body.quantity; // Quantity to update from request body

    // Ensure addToCartProductId and qty are provided
    if (!addToCartProductId || qty === undefined) {
      return res.status(400).json({
        message: "Product ID and quantity are required.",
        error: true,
        success: false,
      });
    }

    // Correct usage of updateOne with filter and update object
    const updateProduct = await addToCartModel.updateOne(
      { _id: addToCartProductId, userId: currentUserId }, // Filter by product ID and user ID
      { $set: { quantity: qty } } // Update the quantity field
    );

    // Check if the product was found and updated
    if (updateProduct.nModified === 0) {
      return res.status(404).json({
        message: "Product not found or already updated.",
        error: true,
        success: false,
      });
    }

    // Successful update response
    res.json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    // Handle any errors
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
