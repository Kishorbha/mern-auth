module.exports = (model, payload) => {
  console.log(payload, "mappers")
  const { name, email } = payload
  if (name) model.name = name
  if (email) model.email = email
}
