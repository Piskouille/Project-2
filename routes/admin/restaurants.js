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
    } catch (error) {
      next(error);
    }
  }
);
// the creation of one restaurant
router.get(
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
        isAdmin,
        scripts: ['bugerMenu.js', 'userModal.js'],
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/restaurants-create',
  checkRole('ADMIN'),
  upload.single('image'),
  async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findOne({ name: req.body.name });
      if (restaurant) {
        res.render('restaurant.create.hbs', { errorMsg: 'Name already taken' });
        return;
      }
      const Foodtype = await FoodType.findOne({ name: req.body.foodType });
      if (Foodtype) {
        res.render('restaurant.create.hbs', {
          errorMsg: 'FoodType already exist in the database',
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
        image = 'https://picsum.photos/200/300';
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

      res.redirect('/restaurants-manage');
    } catch (error) {
      next(error);
    }
  }
);

// render of one restaurant with the id from the list
router.get('/restaurants/:id', checkRole('ADMIN'), async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      'foodTypes'
    );
    res.render('restaurantDetails.hbs', { restaurant: restaurant });
  } catch (error) {
    next(error);
  }
});

// delete one restaurant
router.get(
  '/restaurants/:id/delete',
  checkRole('ADMIN'),
  async (req, res, next) => {
    try {
      await Restaurant.findByIdAndDelete(req.params.id);
      res.redirect('/restaurants');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
