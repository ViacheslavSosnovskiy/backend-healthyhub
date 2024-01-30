const express = require("express");

const controllers = require("../../controllers/auth")

const router = express.Router()

router.post("/signup", controllers.signup)

router.post("/signin", controllers.signin)

// router.post("/signout", controllers.signout)

// router.post("/forgotPassword", controllers.forgotPassword)

module.exports = router