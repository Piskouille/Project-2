const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantModel = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  foodType: [
    {
      type: Schema.Types.ObjectId,
      ref: "foodType",
    },
  ],
  rating: {
    type: Number,
    min: 0,
    max: 3,
  },
  adress: {
    type: String,
    maxlength: 500,
  },
  phone: {
    type: String,
    maxlength: 20,
  },
});

const Restaurant = mongoose.model("restaurant", restaurantModel);

module.exports = Restaurant;
