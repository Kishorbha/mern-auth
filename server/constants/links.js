exports.emailVerificationLink = (token) =>
  `${process.env.CLIENT_URL}/auth/activate/${token}`

exports.passwordResetLink = (token) =>
  `${process.env.CLIENT_URL}/auth/password/reset/${token}}`
