const nodemailer = require("nodemailer")

exports.sendEmail = (to, subject, message, template) => {
  const transporter = nodemailer.createTransport({
    host: "65.1.150.134",
    port: 5679,
    secure: false,
    auth: {
      user: null,
      pass: null,
    },
  })

  const mailOption = {
    from: "noreply@neputer.com",
    to: to,
    subject: subject,
    text: message,
    html: template,
  }

  transporter.sendMail(mailOption, function (err, info) {
    if (err) {
      return false
    } else {
      return true
    }
  })
}
