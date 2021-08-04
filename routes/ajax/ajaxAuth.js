const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send('Need an email and a password.')
      return;
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.send('Wrong credentials')
      return;
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      res.send('Wrong credentials');
      return;
    } else {
      req.session.currentUser = {
        _id: validUser._id,
      };
      res.send('Succesfully Logged!');
    }
  } catch (error) {
    console.log(error);
  }

  // passport.authenticate('local', {failureFlash: true}, (err, theUser, failDetails) => {
  //       if (err) return next(err)
  //       console.log(err, theUser, failDetails, req.body)
  //       theUser = req.body
  //       console.log(theUser)
  //       if (!theUser) {
  //         //Always arrive here with axios
  //         res.send('Wrong Credentials')
  //         return;
  //       }
  //       // ----------------------------------------
  //       // User is saved in req.user ↓↓↓
  //       req.login(theUser, error => {
  //         if (error) return next(error)
  //         res.send('Succesfully logged In')
  //       })
  //     })(req, res, next)
})

router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      
      res.send('Please make sure you fill all the inputs');
      return;
    }
    const emailUsed = await User.findOne({ email });
    if (emailUsed) {
      res.send('This email address is already used.')
      return;
    }
    const securePassword = bcrypt.hashSync(password);
    await User.create({ name, email, password: securePassword });
    //Add a flash Succesfully registered on redirect ?
    res.send('Succesfully Registered')
  } catch (error) {
    next(error);
  }
})

module.exports = router