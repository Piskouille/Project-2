const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// Passport requirements
const passport = require('passport');

router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {failureFlash: true}, (err, theUser, failDetails) => {
        if (err) return next(err)
        if (!theUser) {
          res.send('Wrong Credentials')
          return;
        }
        // ----------------------------------------
        // User is saved in req.user ↓↓↓
        req.login(theUser, error => {
          if (error) return next(error)
          res.redirect('/')
        })
      })(req, res, next)
})

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
})

module.exports = router