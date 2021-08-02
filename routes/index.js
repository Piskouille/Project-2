var express = require('express');
var router = express.Router();
const Restaurant = require('../models/Restaurant')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const restaurants = await Restaurant.find().populate("foodTypes")
    
    res.render('landing-page', { 
      restaurants,
      scripts: ['/bugerMenu.js', '/displayPrice.js'] });
  }
  catch(err){
    console.log('Loading restaurants failed')
  }
})

module.exports = router;
