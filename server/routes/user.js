const express = require("express")
const router = express.Router()

// import controller
const { getUser, getUserByID, update } = require("../controllers/user")

// middleware
const { requireSignin, adminMiddleware } = require("../middleware/auth")

router.get("/user", requireSignin, getUser)
router.get("/user/:id", requireSignin, getUserByID)
router.put("/user/update", requireSignin, adminMiddleware, update)

module.exports = router
