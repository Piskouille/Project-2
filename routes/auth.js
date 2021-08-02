const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
// Passport requirements
const passport = require('passport');

//  -----------------------------------------------------
//  Routes are prefixed with /auth
//  -----------------------------------------------------

//  -----------------------------------------------------
//  SIGN-UP
//  -----------------------------------------------------
router.get('/signup', (req, res, next) => {
  res.render('/signup.hbs', {
    errorMsg: req.flash('info'),
  });
});

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      req.flash('info', 'Please fill all inputs.');
      res.redirect('/signup');
      return;
    }
    const emailUsed = await User.findOne({ email });
    if (emailUsed) {
      req.flash('info', 'This e-mail adress is already used');
      res.redirect('/signup');
      return;
    }
    const securePassword = bcrypt.hashSync(password);
    await User.create({ name, email, password: securePassword });
    //Add a flash Succesfully registered on redirect ?
    res.redirect('/signin');
  } catch (error) {
    next(error);
  }
});

//  -----------------------------------------------------
//  SIGN-IN
//  -----------------------------------------------------

router.get('/signin', (req, res, next) => {
  res.render('signin', {
    errorMsg: req.flash('info'),
  });
});

router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash('info', 'Add a username, password combo');
      res.redirect('/signin');
      return;
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      req.flash('info', 'Wrong credentials');
      res.redirect('/signin');
      return;
    }
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (validPass) {
      req.session.currentUser = {
        _id: validUser._id,
      };
      res.redirect('/');
    } else {
      req.flash('info', 'Wrong credentials');
      res.redirect('/signin');
    }
  } catch (error) {
    next(error);
  }
});

//     GOOGLE
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
