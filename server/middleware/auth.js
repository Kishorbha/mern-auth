const expressJwt = require("express-jwt")
const userModel = require("../models/user")

// Authencity Check
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user
})

// Admin middleware
exports.adminMiddleware = (req, res, next) => {
  userModel.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      })
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Access Denied!",
      })
    }

    req.profile = user
    next()
  })
}
