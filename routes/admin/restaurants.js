const router = require("exprees").Router();
const Restaurant = require("../models/Restaurant");

// render of all the restaurants from the database
router.get("/restaurants", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.find();
    res.render("restaurants", { restaurants: restaurant });
  } catch (error) {
    next(error);
  }
});

// render of one restaurant with the id from the list
router.get("/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(res.params.id);
    res.render("restaurants/:id", { restaurant: restaurant });
  } catch (error) {
    next(error);
  }
});

// the creation of one restaurant
router.post("/restaurants/create", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ name: req.body.name });
    if (restaurant.name) {
      res.render("restaurants/create", { errorMsg: "Name already taken" });
      return;
    }
    await Restaurant.create(req.body);
    res.redirect("/restaurants");
  } catch (error) {
    next(error);
  }
});

// delete one restaurant
router.delete("/restaurants/:id", async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.body.id);
    res.redirect("/restaurants");
  } catch (error) {
    next(error);
  }
});
