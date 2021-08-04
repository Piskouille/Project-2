const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

module.exports = () => {
  passport.serializeUser((user, cb) => cb(null, user._id))
  
  passport.deserializeUser( async (id, cb) => {
    try {
      const user = await User.findById(id)
      cb(null, user)
    } catch(error) {
      cb(error)
    }
  })

  passport.use(
    new LocalStrategy(
      { passReqToCallback: true },
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = User.findOne({ email })
          if (!user || !bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Wrong credentials'})
          }
          return done(null, user)
        } catch(error) {
          done(error)
        }
      }
    )
  )
}