const { Schema, model } = require("mongoose")
const Joi = require("joi")

const {handleMongooseError} = require("../helpers")

const waterIntakeSchema = new Schema({
    ml: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

}, { versionKey: false, timestamps: true })

waterIntakeSchema.post("save", handleMongooseError)

const addWaterIntakeSchema = Joi.object({
    ml: Joi.number().required(),
})

const waterIntakeJoiSchema = {
    addWaterIntakeSchema,
}

const WaterIntake = model("waterIntake", waterIntakeSchema, "waterIntake")

module.exports = {
    WaterIntake,
    waterIntakeSchema,
    waterIntakeJoiSchema,
}