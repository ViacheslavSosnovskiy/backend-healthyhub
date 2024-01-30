const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const bcrypt = require("bcrypt")
const { HttpError } = require("../../helpers");
const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { name, email, password } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    HttpError(401, "Email or passwor invalid");
  }

  const comparePassword = bcrypt.compare(password, user.password)
  if(!comparePassword) {
    throw Error(401, "Email or password invalid")
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.status(201).json({
    token,
    name,
    message: "Signin successfully",
  });
};

module.exports = signin;
