const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // match: emailRegexp,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  token: {
    type: String,
    default: "",
  }
});

const singupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const userJoiSchemas = {
  singupSchema,
  signinSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  userJoiSchemas,
};
