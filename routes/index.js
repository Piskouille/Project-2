var express = require("express");
const FoodType = require("../models/FoodType");
var router = express.Router();
const Restaurant = require("../models/Restaurant");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let loggedIn = false;
  if (req.isAuthenticated()) {
    loggedIn = true;
  } else {
    if (req.session.currentUser) {
      loggedIn = true;
    }
  }

  // isAuthenticated est Bool
  console.log(
    "user authenticated w/ passport: ",
    req.user,
    req.isAuthenticated()
  );
  console.log("user authenticated without passport: ", req.session.currentUser);
  try {
    const restaurants = await Restaurant.find().populate("foodTypes");
    const foodTypes = await FoodType.find();

    res.render("landingPage", {
      restaurants: restaurants,
      foodTypes: foodTypes,
      loggedIn: loggedIn,
      scripts: [
        "bugerMenu.js",
        "logModal.js",
        "cards.js",
        "filters.js",
        "intersectionObserver.js",
      ],
    });
  } catch (err) {
    console.log("Loading restaurants failed");
  }
});

module.exports = router;
