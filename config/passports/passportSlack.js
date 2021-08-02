const User = require('../../models/User');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const keys = require('../keys');

module.exports = () => {
  passport.use(
    new SlackStrategy(
      {
        clientID: keys.slack.clientID,
        clientSecret: keys.slack.clientSecret,
        callbackURL: '/auth/slack/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('Slack account details: ', profile);

        try {
          const user = await User.findOne({ slackId: profile.id });
          if (user) {
            done(null, user);
            return;
          }
          const newUser = await User.create({ slackId: profile.id });
          done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
