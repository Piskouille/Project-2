const User = require('../../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../keys');

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
            return;
          }

          const email = profile.emails[0].value;
          const name = profile.displayName;
          const newUser = await User.create({
            email,
            name,
            googleId: profile.id,
          });
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
