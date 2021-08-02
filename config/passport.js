const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const passport = require('passport');
const User = require('../models/User')

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        // passport cb function
        // check if user exist

        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          //if we already have a record with the given profile ID
          //Done function : tell passport we have finishedlooking up
          //or creating a user and it should now proceed with the
          //authentication flow.

          // null: an error object which tells passport things are fine
          // and there is no error.
          done(null, user);
        } else {
          console.log(profile)
          const email = profile.emails[0].value
          const name = profile.displayName

          user = await User.create({ email, name,  googleId: profile.id });
          done(null, user);
        }
      }
    )
  );

  // Serialize user
  passport.serializeUser((user, done) => {
      console.log(user)
    done(null, user._id);
  });
  // Deserialize user
  // To be used when
  passport.deserializeUser(function (id, done) {
      console.log(id)
    User.findById(id, function (err, user) {
        
      done(null, user);
    });
  });
};
