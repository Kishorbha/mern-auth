const userModel = require("../models/user")
const { userToSend } = require("../dtos/user")

// Get User By ID
exports.getUserByID = (req, res) => {
  const userId = req.params.id
  userModel.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      })
    }
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  })
}

// Get All Users
exports.getUser = async (req, res, next) => {
  try {
    const usersData = await userModel.find({}).sort({ createdAt: -1 })
    const dataToSend = []
    usersData.map((users) => {
      dataToSend.push(userToSend(users))
    })
    res.status(200).json({
      users: dataToSend,
    })
  } catch (err) {
    next(err)
  }
}

// Update User
exports.update = (req, res) => {
  const { name, password } = req.body
  console.log(req.body)
}
