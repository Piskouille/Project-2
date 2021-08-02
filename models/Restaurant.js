const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  foodTypes: [
    {
      type: Schema.Types.ObjectId,
      ref: "foodType",
    },
  ],
  priceRating: {
    type: Number,
    min: 0,
    max: 3,
  },
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: String,
  },
  phone: {
    type: String,
    maxlength: 20,
  },
  coordinates: {
    lat: Number,
    long: Number,
  },
  image: String,
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
