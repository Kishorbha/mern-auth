const router = require("express").Router()
const {
  signup,
  accountActivation,
  signin,
  forgetPassword,
  resetPassword,
} = require("../controllers/auth")
const {
  userSignupValidator,
  userSigninValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
} = require("../validators/auth")
const { runValidation } = require("../validators")

router.post("/signup", userSignupValidator, runValidation, signup)
router.post("/account-activation", accountActivation)
router.post("/signin", userSigninValidator, runValidation, signin)
router.put(
  "/forget-password",
  forgetPasswordValidator,
  runValidation,
  forgetPassword
)
router.put(
  "/reset-password",
  userSigninValidator,
  resetPasswordValidator,
  runValidation,
  resetPassword
)
module.exports = router
