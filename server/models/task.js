const mongoose = require("mongoose")

// Task Schema

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
  },
})

module.exports = mongoose.model("Task", taskSchema)
