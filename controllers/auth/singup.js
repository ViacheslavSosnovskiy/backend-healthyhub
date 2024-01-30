const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const {SECRET_KEY} = process.env

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    HttpError(409, "Email already in use");
  }

  // if(!name || !email || !password) {
  //   throw HttpError(400, "Bad Request")
  // }

  const createHashPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({...req.body, password: createHashPassword})

  const token = jwt.sign({id: newUser._id}, SECRET_KEY, {expiresIn: "23h"})

  res.status(201).json({
    token,
    message: "Success",
  });
};

module.exports = signup;
