const express = require("express")
const router = express.Router()

// import controller
const { getUser, getUserByID, update } = require("../controllers/user")

router.get("/user", getUser)
router.get("/user/:id", getUserByID)
router.get("/user/:id", getUserByID)
router.get("/user/update", update)

module.exports = router
