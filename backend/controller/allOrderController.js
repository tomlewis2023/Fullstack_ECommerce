const orderModel = require("../models/orderProductModel");
const userModel = require("../models/userModel");

const allOrderController = async (req, res) => {
  try {
    // Fetch the requesting user's details
    const user = await userModel.findById(req.userId).lean();
    if (!user) {
      return res.status(403).json({ message: "User not found", success: false });
    }

    let orders;
    if (user.role === "ADMIN") {
      // Admin can view all orders
      orders = await orderModel.find().lean();
    } else {
      // Regular users can only see their own orders
      orders = await orderModel.find({ userId: req.userId }).lean();
    }

    // Attach user details to orders
    const ordersWithUserDetails = orders.map(order => ({
      ...order,
      user: user, // Attach user details (same user for non-admins)
    }));

    return res.status(200).json({
      data: ordersWithUserDetails,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = allOrderController;
