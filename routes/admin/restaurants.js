<<<<<<< HEAD
const router = require("express").Router();
const Restaurant = require("../../models/Restaurant");
const FoodType = require("../../models/FoodType");
const upload = require("../../config/cloudinary");
const checkRole = require("../../middlewares/checkRoles");
// render of all the restaurants from the database
router.get(
  "/restaurants-manage",

  async (req, res, next) => {
    try {
      const restaurants = await Restaurant.find();
      res.render("restaurants", { restaurants: restaurants });
=======
const router = require('express').Router();
const Restaurant = require('../../models/Restaurant');
const FoodType = require('../../models/FoodType');
const upload = require('../../config/cloudinary');
const checkRole = require('../../middlewares/checkRoles');
// render of all the restaurants from the database
router.get(
  '/restaurants-manage',
  checkRole('ADMIN'),
  async (req, res, next) => {
    try {
      const restaurant = await Restaurant.find();
      res.render('restaurants', { restaurants: restaurant });
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
    } catch (error) {
      next(error);
    }
  }
);
// the creation of one restaurant
router.get(
<<<<<<< HEAD
  "/restaurants-create",

  async (req, res, next) => {
    try {
      const foodTypes = await FoodType.find();
      res.render("restaurantCreate", { foodTypes: foodTypes });
=======
  '/restaurants-create',
  checkRole('ADMIN'),
  async (req, res, next) => {
    let modal = 'logModal.js';
    let loggedIn = false;
    if (req.isAuthenticated() || req.session.currentUser) {
      loggedIn = true;
      modal = 'userModal.js';
    }
    const user = req.isAuthenticated() ? req.user : req.session.currentUser;
    const isAdmin = user?.role === 'ADMIN' ? true : false;
    try {
      res.render('restaurantCreate.hbs', {
        user,
        loggedIn,
        scripts: ['bugerMenu.js', 'userModal.js'],
      });
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
    } catch (error) {
      next(error);
    }
  }
);

router.post(
<<<<<<< HEAD
  "/restaurants-create",
  upload.single("image"),

=======
  '/restaurants-create',
  checkRole('ADMIN'),
  upload.single('image'),
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
  async (req, res, next) => {
    try {
      //check if the name of the restaurant was already in the database
      const restaurant = await Restaurant.findOne({ name: req.body.name });
      if (restaurant) {
<<<<<<< HEAD
        res.render("restaurantCreate", { errorMsg: "Name already taken" });
        return;
      }
      // check if the food type was already in database otherwise we add the new one
      const oldFoodtype = await FoodType.findOne({
        name: req.body.newfoodType.toLowerCase(),
      });

      if (oldFoodtype) {
        res.render("restaurantCreate", { errorMsg: "Food Type exist already" });
=======
        res.render('restaurant.create.hbs', { errorMsg: 'Name already taken' });
        return;
      }
      const Foodtype = await FoodType.findOne({ name: req.body.foodType });
      if (Foodtype) {
        res.render('restaurant.create.hbs', {
          errorMsg: 'FoodType already exist in the database',
        });
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
        return;
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
        foodType,
        description,
        image,
      } = req.body;
      if (req.file) {
<<<<<<< HEAD
        req.body.image = req.file.path;
=======
        var image = {};
        image = req.file.secure_url;
      } else {
        image = 'https://picsum.photos/200/300';
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
      }

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
<<<<<<< HEAD
      await FoodType.create({ name: req.body.foodType });
      await Restaurant.create(req.body);
      res.redirect("/admin/restaurants-manage");
=======

      res.redirect('/restaurants-manage');
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
    } catch (error) {
      next(error);
    }
  }
);

// render of one restaurant with the id from the list
<<<<<<< HEAD
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
    try {
      const restaurant = await Restaurant.findById(req.params.id).populate(
        "foodTypes"
      );
      res.render("restaurantEdit", { restaurant: restaurant });
    } catch (error) {
      next(error);
    }
=======
router.get('/restaurants/:id', checkRole('ADMIN'), async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      'foodTypes'
    );
    res.render('restaurantDetails.hbs', { restaurant: restaurant });
  } catch (error) {
    next(error);
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
  }
);

<<<<<<< HEAD
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
      const food = await FoodType.create({ name: foodType });

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
      res.redirect("/admin/restaurants-manage");
=======
// delete one restaurant
router.get(
  '/restaurants/:id/delete',
  checkRole('ADMIN'),
  async (req, res, next) => {
    try {
      await Restaurant.findByIdAndDelete(req.params.id);
      res.redirect('/restaurants');
>>>>>>> be095623ef2d4abe1933ffb1ce39d2f547929abd
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
