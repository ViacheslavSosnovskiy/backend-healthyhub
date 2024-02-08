const { calculateDailyCalories, calculateDailyNutrition, calculateDailyWater } = require("../../calculations");
const { creatingWeighingsDiary } = require("../../helpers");
const { User } = require("../../models/user");
const { Weighing } = require("../../models/weighing");
const { WeighingsDiary } = require("../../models/weighingsDiary");

const updateInfo = async (req, res) => {
  const { _id, goal } = req.user;
  const { age, weight, height, gender, coefficientOfActivity } = req.body;

  const dailyCaloriesCalc = calculateDailyCalories({
    age,
    weight,
    height,
    gender,
    coefficientOfActivity,
  });

  const dailyNutritionCalc = calculateDailyNutrition({
    goal,
    dailyCalories: dailyCaloriesCalc
  })

  const dailyWaterCalc = calculateDailyWater({
    weight,
    coefficientOfActivity,
  })

  await creatingWeighingsDiary(_id, weight, WeighingsDiary, Weighing)

  const updatedUser = await User.findByIdAndUpdate(
    {_id},
    {...req.body, dailyCalories: dailyCaloriesCalc, dailyNutrition: dailyNutritionCalc, dailyWater: dailyWaterCalc},
    {new: true}
  ).select("-password -createdAt -updatedAt")

  res.json(updatedUser)
};

module.exports = updateInfo