const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handlerMongooseError } = require("../helpers");

const weighingSchema = new Schema(
  {
    weight: {
      type: Number,
      require: [true, "set weight for user"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

weighingSchema.post("save", handlerMongooseError);

const addUserWeighingSchema = Joi.object({
  weight: Joi.number().required(),
});

const weighingJoiSchemas = {
  addUserWeighingSchema,
};

const Weighing = model("weighing", weighingSchema);

module.exports = {
  Weighing,
  weighingSchema,
  weighingJoiSchemas,
};
