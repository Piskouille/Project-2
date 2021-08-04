const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const FoodType = require('../models/FoodType');
const Favorite = require('../models/Favorite')

/* GET home page. */
router.get('/', async function(req, res, next) {

let modal = 'logModal.js'
let loggedIn = false
if (req.isAuthenticated() || req.session.currentUser) {
  loggedIn = true
  modal = 'userModal.js'
}
const user = req.isAuthenticated() ? req.user : req.session.currentUser
const isAdmin = user?.role === 'ADMIN' ? true : false

// isAuthenticated est Bool
console.log('user authenticated w/ passport: ', req.user, req.isAuthenticated())
console.log('user authenticated without passport: ', req.session.currentUser)
  try{
    const restaurants = await Restaurant.find().populate("foodTypes")
    const foodTypes = await FoodType.find()
    const favoritesData = await Favorite.find({user})
    const favorites = favoritesData.map(fav => fav.restaurant)
  
    res.render('landingPage', { 
      restaurants,
      favorites,
      foodTypes,
      loggedIn,
      user,
      isAdmin,
      scripts: ['bugerMenu.js', modal, 'cards.js', 'filters.js', 'intersectionObserver.js'] });
  }
  catch(err){
    console.log('Loading restaurants failed')
  }
})

module.exports = router;
