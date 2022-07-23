const Format = require("date-and-time")
const formatDate = (date, format) => {
  return Format.format(date, format || "ddd, MMM DD YYYY")
}
module.exports = formatDate
