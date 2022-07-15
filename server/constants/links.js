exports.emailVerificationLink = (token) =>
  `${process.env.CLIENT_URL}/auth/activate/${token}`
