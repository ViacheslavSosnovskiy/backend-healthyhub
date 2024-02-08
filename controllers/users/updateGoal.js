const { calculateDailyNutrition } = require("../../calculations")
const { User } = require("../../models/user")

const updateGoal = async (req, res) => {
    const {_id, dailyCalories} = req.user
    const {goal} = req.body

    const dailyNutritionCalc = calculateDailyNutrition({
        goal,
        dailyCalories,
    })

    const updatedUser = await User.findByIdAndUpdate(
        {_id},
        {dailyNutrition: dailyNutritionCalc, goal},
        {new: true}
    ).select("dailyNutrition goal")

    res.json(updatedUser)
}

module.exports = updateGoal