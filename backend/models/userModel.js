const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema(
  {
    fname: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    profilepic: String,
    role: String,
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
