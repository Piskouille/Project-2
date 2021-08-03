const router = require("express").Router();
const Restaurant = require("../../models/Restaurant");
const FoodType = require("../../models/FoodType");
const upload = require("../../config/cloudinary");
const checkRole = require("../../middlewares/checkRoles");
// render of all the restaurants from the database
router.get("/restaurants-manage", async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.render("restaurants", { restaurants: restaurants });
  } catch (error) {
    next(error);
  }
});
// the creation of one restaurant
router.get("/restaurants-create", async (req, res, next) => {
  try {
    const foodTypes = await FoodType.find();
    res.render("restaurantCreate", { foodTypes: foodTypes });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/restaurants-create",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findOne({ name: req.body.name });
      if (restaurant) {
        res.render("restaurantCreate", { errorMsg: "Name already taken" });
        return;
      }
      const oldFoodtype = await FoodType.findOne({
        name: req.body.newfoodType.toLowerCase(),
      });

      if (Foodtype) {
        req.body.newfoodType = oldFoodtype
        // res.render("restaurantCreate", { errorMsg: "Food Type exist already" });
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
        description,
        image
      } = req.body;

      const food = await FoodType.create({ name: foodType });
      await Restaurant.create({
        name: name,
        foodTypes: [food._id],
        priceRating: rating,
        address: {
          number: number,
          street: street,
          city: city,
          zipCode: zipCode,
          country: country,
        },
        phone: phone,
        image: image,
        description: description,
      });
      await FoodType.create({ name: req.body.foodType });
      await Restaurant.create(req.body);
      res.redirect("restaurants-manage");
    } catch (error) {
      next(error);
    }
  }
);

// render of one restaurant with the id from the list
router.get("/restaurants/:id/delete", async (req, res, next) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.redirect("admin/restaurants-manage");
  } catch (error) {
    next(error);
  }
});
// display the form of the editing restaurant
router.get("/restaurants/:id/edit", async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "foodTypes"
    );
    res.render("restaurantEdit", { restaurant: restaurant });
  } catch (error) {
    next(error);
  }
});

// get the edited form of the restaurant
router.post(
  "/restaurants/:id/edit",
  upload.single("image"),
  async (req, res, next) => {
    try {
      // res.render("restaurantCreate", {
      //   errorMsg: "FoodType already exist in the database",
      // });

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
        description,
      } = req.body;
      req.body.image = req.file.path;
      const Foodtype = await FoodType.findOne({
        name: req.body.foodType.toLowerCase(),
      });

      const food = await FoodType.create({ name: foodType });
      if (Foodtype) {
        req.body.foodType = await FoodType.findByIdAndUpdate(
          req.params.id,
          { name: foodType },
          { new: true }
        );
      }
      await Restaurant.findByIdAndUpdate(
        req.params.id,
        {
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
          image: req.body.image,
          description: description,
        },
        { new: true }
      );
      res.redirect("admin/restaurants-manage");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
