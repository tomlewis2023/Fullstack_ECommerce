const userModel = require('../models/userModel')

async function allUsersController(req, res) {
  try {
    console.log("userid all users", req.userId);

    

    const allUsers = await userModel.find()
    console.log("allusercontr",allUsers);
    

    res.status(200).json({
      message: "All User ",
      data: allUsers,
      error: false,
      success: true

    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsersController;
