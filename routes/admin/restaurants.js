const router = require("express").Router();
const Restaurant = require("../../models/Restaurant");
const FoodType = require("../../models/FoodType");
const upload = require("../../config/cloudinary");
const checkRole = require("../../middlewares/checkRoles");
// render of all the restaurants from the database
router.get(
  "/restaurants-manage",

  async (req, res, next) => {
    let loggedIn = false;
    if (req.isAuthenticated() || req.session.currentUser) {
      loggedIn = true;
    }
    const user = req.isAuthenticated() ? req.user : req.session.currentUser;
    const isAdmin = user?.role === "ADMIN" ? true : false;
    try {
      const restaurants = await Restaurant.find().populate("foodTypes");
      res.render("admin/restaurants", {
        restaurants,
        user,
        loggedIn,
        isAdmin,
        scripts: ["bugerMenu.js", "userModal.js"],
      });
    } catch (error) {
      next(error);
    }
  }
);
// the creation of one restaurant
router.get(
  "/restaurants-create",
  checkRole("ADMIN"),
  async (req, res, next) => {
    let loggedIn = false;
    if (req.isAuthenticated() || req.session.currentUser) {
      loggedIn = true;
    }
    const user = req.isAuthenticated() ? req.user : req.session.currentUser;
    const isAdmin = user?.role === "ADMIN" ? true : false;
    const foodTypes = await FoodType.find();
    try {
      res.render("admin/restaurantCreate.hbs", {
        foodTypes,
        user,
        loggedIn,
        isAdmin,
        scripts: ["bugerMenu.js", "userModal.js"],
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/restaurants-create",
  checkRole("ADMIN"),
  upload.single("image"),
  async (req, res, next) => {
    try {
      //check if the name of the restaurant was already in the database
      const restaurant = await Restaurant.findOne({ name: req.body.name });
      if (restaurant) {
        req.flash("Name already in database");
        res.redirect("/admin/restaurants-create");
        return;
      }
      // check if the food type was already in database otherwise we add the new one
      const oldFoodtype = await FoodType.findOne({
        name: req.body.newfoodType.toLowerCase(),
      });

      if (oldFoodtype) {
        req.flash("Food type already in database");
        res.redirect("/admin/restaurants-create");
        return;
      }

      if (req.file) {
        req.body.image = req.file.path;
      }
      if (Array.isArray(req.body.foodTypes)) {
        req.body.foodTypes = req.body.foodTypes.map(async (element) => {
          return await FoodType.create({ name: element });
        });
      } else {
        req.body.foodTypes = req.body.foodTypes.map(async (element) => {
          return await FoodType.findOneAndUpdate(
            { name: element },
            { new: true }
          );
        });
      }
      // destructuring the req.body to create foodtype cos of the dependance with the model restaurant
      const {
        number,
        street,
        city,
        zipCode,
        country,
        name,
        phone,
        rating,
        foodTypes,
        description,
        image,
      } = req.body;
      await Restaurant.create({
        name: name,
        foodTypes: [foodTypes],
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
      res.redirect("/admin/restaurants-manage");
    } catch (error) {
      next(error);
    }
  }
);

// render of one restaurant with the id from the list
router.get(
  "/restaurants/:id/delete",

  async (req, res, next) => {
    
    try {
      await Restaurant.findByIdAndDelete(req.params.id);
      req.flash("info", "You deleted this shiitttt !.");
      res.redirect("/admin/restaurants-manage");
    } catch (error) {
      next(error);
    }
  }
);
// display the form of the editing restaurant
router.get(
  "/restaurants/:id/edit",

  async (req, res, next) => {
    let loggedIn = false;
    if (req.isAuthenticated() || req.session.currentUser) {
      loggedIn = true;
    }
    const user = req.isAuthenticated() ? req.user : req.session.currentUser;
    const isAdmin = user?.role === "ADMIN" ? true : false;
    try {
      const restaurant = await Restaurant.findById(req.params.id).populate(
        "foodTypes"
      );
      const foodTypes = await FoodType.find();
      res.render("admin/restaurantEdit", {
      restaurant,
      foodTypes,
      user,
      loggedIn,
      isAdmin,
      scripts: ["bugerMenu.js", "userModal.js"],
    });
    } catch (error) {
      next(error);
    }
  }
);

// get the edited form of the restaurant
router.post(
  "/restaurants/:id/edit",
  upload.single("image"),
  async (req, res, next) => {
    try {
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
        image,
      } = req.body;
      if (req.file) {
        req.body.image = req.file.path;
      }
      const oldFoodtype = await FoodType.findOne({
        name: req.body.newfoodType.toLowerCase(),
      });

      if (oldFoodtype) {
        res.redirect("/admin/restaurants-manage", {
          errorMsg: "Food Type exist already",
        });
        return;
      }
      if (Array.isArray(foodType)) {
        req.body.foodType = foodType.map(async (element) => {
          return await FoodType.create({ name: element });
        });
      }

      await Restaurant.findByIdAndUpdate(
        req.params.id,
        {
          name: name,
          foodTypes: [foodType._id],
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
          description: description,
        },
        { new: true }
      );
      res.redirect("/admin/restaurants-manage");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
