const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

//  -----------------------------------------------------
//  Routes are prefixed with /auth
//  -----------------------------------------------------

//  -----------------------------------------------------
//  SIGN-UP
//  -----------------------------------------------------
router.get('/signup', (req, res, next) => {
  res.render('/signup.hbs');
});

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.redirect('/signup', {
        errorMsg: 'Please fill all inputs.',
      });
      return;
    }
    const emailUsed = await User.findOne({ email });
    if (emailUsed) {
      res.redirect('/signup', {
        errorMsg: 'This e-mail adress is already used',
      });
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
  res.render('signin');
});

router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.redirect('/signin', {
        errorMsg: 'Add a username / password combo',
      });
      return;
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.redirect('/signin', {
        errorMsg: 'Wrong credentials',
      });
      return;
    }
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (validPass) {
      req.session.currentUser = {
        _id: validUser._id,
      };
      res.redirect('/');
    } else {
      res.redirect('/signin', {
        errorMsg: 'Wrong credentials',
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
