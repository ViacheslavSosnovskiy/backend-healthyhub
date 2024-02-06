const { Schema, model } = require("mongoose")

const {handleMongooseError} = require("../helpers")

const recommendedFoodsSchema = new Schema({
    name: String,
    amount: String,
    img: String,
    calories: Number,
    nutrition: {
        carbohydrates: Number,
        protein: Number,
        fat: Number,
    }
}, { versionKey: false, timestamps: true })

recommendedFoodsSchema.post("save", handleMongooseError)

const RecommendedFoods = model("recommendedFood", recommendedFoodsSchema, "recomendedFood")

module.exports = RecommendedFoods