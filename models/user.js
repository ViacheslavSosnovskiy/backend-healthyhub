const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handlerMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const { goals, genders, coefficientsOfActivity } = require("../constants/enums");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      min: 8,
      max: 120,
      required: true,
    },
    gender: {
      type: String,
      enum: genders,
      required: true,
    },
    weight: {
      type: Number,
      min: 20,
      max: 300,
      required: true,
    },
    height: {
      type: Number,
      min: 120,
      max: 220,
    },
    coefficientOfActivity: {
      type: Number,
      enum: coefficientsOfActivity,
      required: true,
    },
    goal: {
      type: String,
      enum: goals,
      required: true,
    },
    dailyCalories: {
      type: Number,
    },
    dailyWater: {
      type: Number,
    },
    dailyNutrition: {
      carbohydrates: Number,
      protein: Number,
      fat: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handlerMongooseError);

const singupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  age: Joi.number().min(8).max(120).required(),
  gender: Joi.string().valid(...genders).required(),
  weight: Joi.number().min(20).max(300).required(),
  height: Joi.number().min(120).max(220).required(),
  goal: Joi.string().valid(...goals).required(),
  coefficientOfActivity: Joi.number().valid(...coefficientsOfActivity).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required()
})

const updateUserInfoSchema = Joi.object({
  name: Joi.string(),
  age: Joi.number().min(8).max(120),
  weight: Joi.number().min(20).max(300),
  height: Joi.number().min(120).max(220),
  gender: Joi.string().valid(...genders),
  coefficientsOfActivity: Joi.number().valid(...coefficientsOfActivity)
})

const updateUserGoalSchema = Joi.object({
  goal: Joi.string().valid(...goals).required()
})

const addUserWeightSchema = Joi.object({
  weight: Joi.number().min(20).max(300).required()
})

const userJoiSchemas = {
  singupSchema,
  signinSchema,
  emailSchema,
  updateUserInfoSchema,
  updateUserGoalSchema,
  addUserWeightSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  userJoiSchemas,
};
