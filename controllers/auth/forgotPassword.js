const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const { HttpError, createMailOptions } = require("../../helpers");
const { User } = require("../../models/user");
const { transporter } = require("../../helpers/transporter");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).send({ message: "Required only email field" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, `No user with email ${email}`);
  }
  const newPassword = uuidv4().slice(0, 10);

  const createHashPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(user._id, { password: createHashPassword });

  const mailOptions = createMailOptions(user.email, newPassword);

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      res.status(201).json({
        message: "New password was sent to your email",
      });
    })
    // .catch((error) => {
    //   res.status(500).json({
    //     message: "Internal Server Error",
    //   });
    // });
};

module.exports = forgotPassword;
