const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { emailVerificationTemplate } = require("../helpers/email-template")
const { sendEmail } = require("../helpers/email")
const {
  emailVerificationLink,
  passwordResetLink,
} = require("../constants/links")
const _ = require("lodash")

// User Signup via Mail
exports.signup = (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      })
    } else {
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "10m" }
      )
      sendEmail(
        email,
        "Email verification",
        "Please verify your email .",
        emailVerificationTemplate(name, emailVerificationLink(token))
      )
      return res.json({
        message: `Email has been sent to ${email}. Follow the instruction to active your account.`,
      })
    }
  })
}

// User Account Activation
exports.accountActivation = (req, res) => {
  const { token } = req.body

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err)
          return res.status(401).json({
            error: "Expired link. Signup again",
          })
        }

        const { name, email, password } = jwt.decode(token)

        const user = new User({ name, email, password })

        user.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err)
            return res.status(401).json({
              error: "Error saving user in database. Try signup again",
            })
          }
          return res.json({
            message: "Signup success. Please signin.",
          })
        })
      }
    )
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    })
  }
}

// User SignIn
exports.signin = (req, res) => {
  const { email, password } = req.body
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      })
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      })
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    })
    const { _id, name, email, role } = user

    return res.json({
      token,
      user: { _id, name, email, role },
    })
  })
}

// Forget Password
exports.forgetPassword = (req, res) => {
  const { email, name } = req.body
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Do not Match",
      })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "5m",
    })

    return user.updateOne({ resetPasswordLink: token }, (err, sucess) => {
      if (err) {
        return res.status(400).json({
          error: "Database connection on user password forget request",
        })
      } else {
        sendEmail(
          email,
          "Password Reset Link",
          "",
          emailVerificationTemplate(name, passwordResetLink(token))
        )
        return res.json({
          message: `Email has been sent to ${email}. Follow the instruction .`,
        })
      }
    })
  })
}

// Reset Password
exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(400).json({
            error: "Expired link. Try again",
          })
        }

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Something went wrong. Try later",
            })
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          }

          user = _.extend(user, updatedFields)

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: "Error resetting user password",
              })
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            })
          })
        })
      }
    )
  }
}
