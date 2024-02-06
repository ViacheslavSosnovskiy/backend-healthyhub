const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { WeighingsDiary } = require("../../models/weighingsDiary")
const { Weighing } = require("../../models/weighing")
const { HttpError, creatingWeighingsDiary} = require("../../helpers");
const {SECRET_KEY} = process.env
const {calculateDailyCalories, calculateDailyNutrition, calculateDailyWater} = require("../../calculations")

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    HttpError(409, "Email already in use");
  }

  const createHashPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({...req.body, password: createHashPassword})
  
  const dailyCaloriesCalc = calculateDailyCalories({
    age: newUser.age,
    weight: newUser.weight,
    height: newUser.height,
    gender: newUser.gender,
    coefficientOfActivity: newUser.coefficientOfActivity,
  })

  const dailyNutritionCalc = calculateDailyNutrition({
    goal: newUser.goal,
    dailyCalories: dailyCaloriesCalc,
  })

  const dailyWaterCalc = calculateDailyWater({
    weight: newUser.weight,
    coefficientOfActivity: newUser.coefficientOfActivity,
  })

  const token = jwt.sign({id: newUser._id}, SECRET_KEY, {expiresIn: "23h"})

  await User.findOneAndUpdate(newUser._id, {token,
    dailyCalories: dailyCaloriesCalc,
    dailyNutrition: dailyNutritionCalc,
    dailyWater: dailyWaterCalc,
  })

  await creatingWeighingsDiary(newUser._id, newUser.weight, WeighingsDiary, Weighing)

const dataForResponse = await User.findOne({email}).select('-password -createdAt -updatedAt -token')
  res.status(201).json({
    token,
    user: dataForResponse,
    consumeMealsByDay: 0,
    consumeWaterByDay: 0
  });
};

module.exports = signup;
