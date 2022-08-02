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
    res.json(userToSend(user))
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

  userModel.findOne({ _id: req.user._id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      })
    }
    if (!name) {
      return res.status(400).json({
        error: "Name is required",
      })
    } else {
      user.name = name
    }
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password must be min 6 characters long",
        })
      } else {
        user.password = password
      }
    }
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: "User update failed",
        })
      }
      res.json(userToSend(updatedUser))
    })
  })
}
