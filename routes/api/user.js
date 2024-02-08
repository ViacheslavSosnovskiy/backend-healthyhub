const express = require("express")
const { authenticate, validateBody } = require("../../middlewares")
const {controllers} = require("../../controllers/users")
const { userJoiSchemas } = require("../../models/user")
const { weighingJoiSchemas } = require("../../models/weighing")

const router = express.Router()

router.get("/current", authenticate, controllers.getCurrent)

router.put("/update", authenticate, validateBody(userJoiSchemas.updateUserInfoSchema), controllers.updateInfo)

router.put("/goal", authenticate, validateBody(userJoiSchemas.updateUserGoalSchema), controllers.updateGoal)

router.post("/weight", authenticate, validateBody(weighingJoiSchemas.addUserWeighingSchema), controllers.addWeight)