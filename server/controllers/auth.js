const User = require("../models/user")
const jwt = require("jsonwebtoken")
const { emailVerificationTemplate } = require("../helpers/email-template")
const { sendEmail } = require("../helpers/email")
const { emailVerificationLink } = require("../constants/links")

exports.signup = (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      })
    }

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
  })
  return res.json({
    message: `Email has been sent to ${email}. Follow the instruction to active your account.`,
  })
}

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
