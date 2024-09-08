const mongoose = require("mongoose");
//connect to database 

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log("connect to DB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
