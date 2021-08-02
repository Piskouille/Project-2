const router = require("express").Router();
const Restaurant = require("../../models/Restaurant");
const FoodType = require("../../models/FoodType");

// render of all the restaurants from the database
router.get("/restaurants", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.find();
    res.render("restaurants", { restaurants: restaurant });
  } catch (error) {
    next(error);
  }
});
// the creation of one restaurant
router.get("/restaurants/create", async (req, res, next) => {
  try {
    res.render("restaurant.create.hbs");
  } catch (error) {
    next(error);
  }
});
router.post("/restaurants/create", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ name: req.body.name });
    if (restaurant) {
      res.render("restaurant.create.hbs", { errorMsg: "Name already taken" });
      return;
    }
    const Foodtype = await FoodType.create(req.body.foodType);
    if (Foodtype) {
      res.render("restaurant.create.hbs", {
        errorMsg: "FoodType already exist in the database",
      });
      return;
    }
    const {name,address,phone,rating,foodType,} = req.body
   const food= await FoodType.create(Foodtype)
    await Restaurant.create({,foodType:food});
    res.rendirect("/restaurants");
  } catch (error) {
    next(error);
  }
});

// render of one restaurant with the id from the list
router.get("/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("partials/one.restaurant.hbs", { restaurant: restaurant });
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

module.exports = router;
