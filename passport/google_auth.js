const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/cb/",
      },
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else {
            //if not, create a new user
            new User({
              googleId: profile.id,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      }
    )
  );
};
