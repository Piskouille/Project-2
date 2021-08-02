var express = require('express');
var router = express.Router();
const Restaurant = require('../models/Restaurant')

/* GET home page. */
router.get('/', async function(req, res, next) {
const loggedIn = req.isAuthenticated()
// isAuthenticated est Bool
console.log('user authenticated: ', req.user, req.isAuthenticated())
  try{
    const restaurants = await Restaurant.find().populate("foodTypes")
    
    res.render('landing-page', { 
      restaurants,
      loggedIn,
      scripts: ['/bugerMenu.js', '/displayPrice.js', '/googleAuth.js'] });
  }
  catch(err){
    console.log('Loading restaurants failed')
  }
})

module.exports = router;
