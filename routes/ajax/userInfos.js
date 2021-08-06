const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Favorite = require('../../models/Favorite');
const isAuth = require('../../middlewares/isAuthenticated');

// Prefixed with /users
router.get('/:id', isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('following')
      .exec();
    const favorites = await Favorite.find({ user: req.params.id })
      .populate({
        path: 'restaurant',
        model: 'restaurant',
        populate: {
          path: 'foodTypes',
          model: 'foodType',
        },
      })
      .exec();
    res.status(200).json({ user, favorites });
  } catch (error) {
    console.log(error);
  }
});

router.post('/email', isAuth, async (req, res, next) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      currentId = req.session.currentUser?._id || req.user?._id;
      const actualFollowed = await User.findById(currentId);
      if (actualFollowed.toString().includes(foundUser._id.toString())) {
        res.send('already added');
      } else {
        actualFollowed.following.push(foundUser._id);
        const followed = await User.findByIdAndUpdate(
          currentId,
          { following: actualFollowed.following },
          { new: true }
        );
        console.log('followed ', followed);
        res.send(foundUser.name);
      }
    } else {
      res.send('not found');
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
