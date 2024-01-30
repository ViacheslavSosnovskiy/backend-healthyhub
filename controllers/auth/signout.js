const { HttpError } = require("../../helpers")
const { User } = require("../../models/user")

const signout = async (req, res) => {
  const {_id} = req.user

  if(!req.user) {
    return HttpError(401)
  }

  await User.findByIdAndUpdate({_id, token: ""})

  res.status(204).json({
    message: "sign out successfully"
  })
}

module.exports = {
  signout
}