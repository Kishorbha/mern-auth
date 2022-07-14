const express = require("express")
const authRoutes = require("./routes/auth")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()

// connect to databas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

connectDB()
const port = process.env.PORT || 3000

// application middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `http://localhost:3000` }))
}

// middleware
app.use(`/api`, authRoutes)

app.listen(port, () => {
  console.log(`API is running on port ${port}`)
})
