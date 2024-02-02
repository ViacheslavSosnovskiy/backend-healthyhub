const express = require("express");

const controllers = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { userJoiSchemas } = require("../../models/user");

const router = express.Router()

router.post("/signup", validateBody(userJoiSchemas.signup), controllers.signup)

router.post("/signin", validateBody(userJoiSchemas.signin) , controllers.signin)

// router.post("/signout", controllers.signout)

// router.post("/forgotPassword", controllers.forgotPassword)

module.exports = router