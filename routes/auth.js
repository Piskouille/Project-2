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
//  CLASSIC SIGN-UP
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
//  PASSPORT SIGN-IN
//  -----------------------------------------------------

router.get('/signin', (req, res, next) => {
  res.render('signin', {
    errorMsg: req.flash('info'),
  });
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {failureFlash: true}, (err, theUser, failDetails) => {
    if (err) return next(err)
    if (!theUser) {
      req.flash('info', 'Wrong credentials');
      res.redirect('/signin');
      return;
    }
    // ----------------------------------------
    // User is saved in req.user ↓↓↓
    req.login(theUser, error => {
      if (error) return next(error)
      
      res.redirect('/')
    })
  })(req, res, next)
});

//  -----------------------------------------------------
//  GOOGLE PASSPORT
//  -----------------------------------------------------
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  //res.send('<script>window.close()</script>');
  req.flash('info', 'Log in succesfull')
  res.redirect('/')
});

//  -----------------------------------------------------
//  SLACK PASSPORT
//  -----------------------------------------------------
router.get('/slack', passport.authenticate('slack', {
  scope: ['profile', 'email']
}))
router.get('/slack/redirect', passport.authenticate('slack'), (req, res) => {
  //res.send('<script>window.close()</script>')
  req.flash('info', 'Log in succesfull')
  res.redirect('/')
})

//  -----------------------------------------------------
//  LOGOUT
//  -----------------------------------------------------
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
