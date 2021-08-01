const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodModel = new Schema({
    image: String,
    foodType: [String]
})

const FoodType = mongoose.model('foodType', foodModel)

module.exports = FoodType