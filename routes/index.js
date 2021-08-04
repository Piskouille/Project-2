var express = require('express');
const FoodType = require('../models/FoodType');
var router = express.Router();
const Restaurant = require('../models/Restaurant')

/* GET home page. */
router.get('/', async function(req, res, next) {
const loggedIn = req.isAuthenticated()
// isAuthenticated est Bool
console.log('user authenticated: ', req.user, req.isAuthenticated())
  try{
    const restaurants = await Restaurant.find().populate("foodTypes")
    const foodTypes = await FoodType.find()
    
    res.render('landingPage', { 
      restaurants,
      foodTypes,
      loggedIn,
      scripts: ['bugerMenu.js', 'logModal.js', 'cards.js', 'filters.js', 'intersectionObserver.js'] });
  }
  catch(err){
    console.log('Loading restaurants failed')
  }
})

module.exports = router;
