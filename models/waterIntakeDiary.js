const { Schema, model } = require("mongoose")

const {waterIntakeSchema} = require("./waterIntake")
const {handleMongooseError} = require("../helpers")

const waterIntakeDiarySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    waterIntakeByDate: [waterIntakeSchema]
}, { versionKey: false, timestamps: true })

waterIntakeDiarySchema.post("save", handleMongooseError)

const WaterIntakeDiary = model("waterIntakeDiary", waterIntakeDiarySchema, "waterIntakeDiary")

module.exports = WaterIntakeDiary