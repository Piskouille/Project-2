const restaurant = require("../models/Restaurant");
const category = require("../models/FoodType");

const foodtype = category.create({
  name: "Asian",
});
restaurant.create({
  name: "Temple impérial",
  foodType: foodtype._id,
  rating: 3,
  adress: "rue de la paix",
  phone: "0183839393",
  coordinates: "13144214,1553232(",
});
