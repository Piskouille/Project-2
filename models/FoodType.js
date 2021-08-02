const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: String,
});

const FoodType = mongoose.model("foodType", foodSchema);

module.exports = FoodType;
