const formatDate = require("../lib/date-formater")

const userToSend = (payload) => {
  const { _id, name, email, role } = payload
  const user_to_send = {
    _id,
    name,
    created_at: formatDate(payload.createdAt),
    email,
    role,
  }
  return user_to_send
}
const userDtos = {
  userToSend,
}
module.exports = userDtos
