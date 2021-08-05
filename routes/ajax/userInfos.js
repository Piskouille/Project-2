const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Favorite = require('../../models/Favorite')
const isAuth = require('../../middlewares/isAuthenticated');


// Prefixed with /users
router.get('/:id', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('following').exec();
    const favorites = await Favorite.find({user: req.params.id}).populate('restaurant').exec()
    res.status(200).json({user, favorites})
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
