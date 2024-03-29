const { check } = require("express-validator")

exports.userSignupValidator = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]

exports.forgetPasswordValidator = [
  check("email").not().isEmpty().isEmail().withMessage("Must be a valid email"),
]

exports.resetPasswordValidator = [
  check("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]
