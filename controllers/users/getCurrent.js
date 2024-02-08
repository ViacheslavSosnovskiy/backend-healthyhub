const { getStartAndEndOfDay } = require("../../helpers")
const { DailyMeal } = require("../../models/dailyMeal")
const { WaterIntake } = require("../../models/waterIntake")

const getCurrent = async (req, res) => {
    const { _id, name, email, age, gender, weight, height, coefficientOfActivity, goal, dailyNutrition, dailyCalories, dailyWater, avatarURL } = req.user
    const { startOfTheDay, endOfTheDay} = getStartAndEndOfDay()

    const getDailyMeal = await DailyMeal.findOne({ owner: _id, createdAt: { $gte: startOfTheDay, $lt: endOfTheDay }}) ?? 0

    const getWaterIntake = await WaterIntake.findOne({ owner: _id, createdAt: { $gte: startOfTheDay, $lt: endOfTheDay}}) ?? 0

    res.json({
        user: {
            _id,
            name,
            email,
            age,
            gender,
            weight,
            height,
            coefficientOfActivity,
            goal,
            dailyNutrition,
            dailyCalories,
            dailyWater,
            avatarURL,
        },
        consumedMealsByDay: getDailyMeal,
        consumedWaterByDay: getWaterIntake,
    })
}

module.exports = getCurrent