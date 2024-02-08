const { calculateDailyCalories, calculateDailyNutrition, calculateDailyWater } = require("../../calculations")
const { creatingWeighingsDiary } = require("../../helpers")
const { User } = require("../../models/user")
const { Weighing } = require("../../models/weighing")
const { WeighingsDiary } = require("../../models/weighingsDiary")

const addWeight = async (req,res) => {
    const {_id, age, height, gender, coefficientOfActivity, goal} = req.user
    const {weight} = req.body

    const dailyCaloriesCalc = calculateDailyCalories({
        age,
        weight,
        height,
        gender,
        coefficientOfActivity,
    })

    const dailyNutritionCalc = calculateDailyNutrition({
        goal,
        dailyCalories: dailyCaloriesCalc
    })

    const dailyWaterCalc = calculateDailyWater({
        weight,
        coefficientOfActivity,
    })

    await creatingWeighingsDiary(_id, weight, WeighingsDiary, Weighing)

    const updateUser = await User.findByIdAndUpdate(
        {_id},
        {weight, dailyCalories: dailyCaloriesCalc, dailyNutrition: dailyNutritionCalc, dailyWater: dailyWaterCalc},
        {new: true}
    ).select("dailyNutrition weight dailyWater dailyCalories")

    res.json(updateUser)
}

module.exports = addWeight