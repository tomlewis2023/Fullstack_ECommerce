const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignupcontroller(req, res) {
  try {
    // Extract input and initial validation
    const { fname, email, password, shippingAddress } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    if (!fname) {
      throw new Error("Please provide name");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip || !shippingAddress.country) {
      throw new Error("Please provide a complete shipping address");
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    if (!hashedPassword) {
      throw new Error("Something went wrong while hashing the password");
    }

    const payload = {
      fname,
      email,
      password: hashedPassword,
      role: "GENERAL",
      shippingAddress,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignupcontroller;
