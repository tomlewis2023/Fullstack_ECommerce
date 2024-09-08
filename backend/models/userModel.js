const mongoose = require("mongoose");

//db schema

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
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
