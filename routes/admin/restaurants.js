const router = require("express").Router();
const Restaurant = require("../../models/Restaurant");
const FoodType = require("../../models/FoodType");
const upload = require("../../config/cloudinary");
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
router.post(
  "/restaurants/create",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findOne({ name: req.body.name });
      if (restaurant) {
        res.render("restaurant.create.hbs", { errorMsg: "Name already taken" });
        return;
      }
      const Foodtype = await FoodType.findOne({ name: req.body.foodType });
      if (Foodtype) {
        res.render("restaurant.create.hbs", {
          errorMsg: "FoodType already exist in the database",
        });
        return;
      }
      const {
        number,
        street,
        city,
        zipCode,
        country,
        name,
        phone,
        rating,
        foodType,
      } = req.body;

      if (req.file) {
        var image = {};
        image = req.file.secure_url;
      } else {
        image = "https://picsum.photos/200/300";
      }

      const food = await FoodType.create({ name: foodType });
      await Restaurant.create({
        name: name,
        foodTypes: [food._id],
        rating: rating,
        address: {
          number: number,
          street: street,
          city: city,
          zipCode: zipCode,
          country: country,
        },
        phone: phone,
        image: image,
      });

      res.redirect("/restaurants");
    } catch (error) {
      next(error);
    }
  }
);

// render of one restaurant with the id from the list
router.get("/restaurants/:id", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.render("restaurantDetails.hbs", { restaurant: restaurant });
  } catch (error) {
    next(error);
  }
});

// delete one restaurant
router.get("/restaurants/:id/delete", async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.redirect("/restaurants");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
