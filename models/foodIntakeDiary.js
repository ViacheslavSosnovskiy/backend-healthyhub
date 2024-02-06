const { Schema, model } = require("mongoose")

const {dailyMealSchema} = require("./dailyMeal")
const {handleMongooseError} = require("../helpers")

const foodIntakeDiarySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    mealByDate:  [dailyMealSchema]
}, { versionKey: false, timestamps: true})

foodIntakeDiarySchema.post("save", handleMongooseError)

const FoodIntakesDiary = model("foodIntakesDiary", foodIntakeDiarySchema, "foodIntakesDiary")

module.exports = FoodIntakesDiary