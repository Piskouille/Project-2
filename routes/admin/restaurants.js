const router = require("express").Router();
const Restaurant = require("../../models/Restaurant");
const FoodType = require("../../models/FoodType");
const upload = require("../../config/cloudinary");
const checkRole = require("../../middlewares/checkRoles");
// render of all the restaurants from the database
router.get(
  "/restaurants-manage",
  checkRole("ADMIN"),
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
      const oldFoodType = await FoodType.findOne({
        name: req.body.newFoodType.toLowerCase(),
      });
      let newfood = null;
      // check if the input of the form its filled

      if (req.body.newFoodType && !oldFoodType) {
        console.log(req.body.newFoodType);
        newfood = await FoodType.create({
          name: req.body.newFoodType,
        });
      }
      req.body.foodTypes = Array.isArray(req.body.foodTypes)
        ? req.body.foodTypes
        : [req.body.foodTypes];

      if (newfood) {
        req.body.foodTypes.push(newfood);
      }

      if (req.file) {
        req.body.image = req.file.path;
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
        priceRating,
        foodTypes,
        description,
        image,
      } = req.body;
      await Restaurant.create({
        name: name,
        foodTypes: foodTypes,
        priceRating: priceRating,
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
      console.log(error)
      next(error);
    }
  }
);

// render of one restaurant with the id from the list
router.get(
  "/restaurants/:id/delete",
  checkRole("ADMIN"),
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
  checkRole("ADMIN"),
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
  checkRole("ADMIN"),
  upload.single("image"),
  async (req, res, next) => {
    try {
      const oldFoodType = await FoodType.findOne({
        name: req.body.newFoodType.toLowerCase(),
      });
      let newFood;
      if (req.body.newFoodType && !oldFoodType) {
        newFood = await FoodType.findByIdAndUpdate(
          {
            name: req.body.newFoodType,
          },
          { new: true }
        );
      }
      req.body.foodTypes = Array.isArray(req.body.foodTypes)
        ? req.body.foodTypes
        : [req.body.foodTypes];

      if (newFood) {
        req.body.foodTypes.push(newFood);
      }

      if (req.file) {
        req.body.image = req.file.path;
      } else {
        req.body.image =
          "https://images.pexels.com/photos/4577740/pexels-photo-4577740.jpeg?auto=compress&cs=tinysrgb&h=350";
      }

      const {
        number,
        street,
        city,
        zipCode,
        country,
        name,
        phone,
        priceRating,
        foodTypes,
        description,
        image,
      } = req.body;
      await Restaurant.findByIdAndUpdate(
        req.params.id,
        {
          name: name,
          foodTypes: foodTypes,
          priceRating: priceRating,
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
