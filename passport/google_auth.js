const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/cb/",
        passReqToCallback: true,
      },
      function (req, token, refreshToken, profile, done) {
        if (!req.user) {
          User.findOne(
            { email: profile.emails[0].value },
            function (err, user) {
              if (err) return done(err);

              if (user) {
                google_auth = user.third_party_auth
                  .filter(
                    (third_party) => third_party.provider_name == "google"
                  )
                  .pop();
                if (!google_auth) {
                  user.third_party_auth.push({
                    provider_name: "google",
                    provider_id: profile.id,
                    provider_token: token,
                  });

                  user.save(function (err) {
                    if (err) throw err;
                    return done(null, user);
                  });
                }

                return done(null, user);
              } else {
                var newUser = new User();
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value;

                newUser.third_party_auth.push({
                  provider_name: "google",
                  provider_id: profile.id,
                  provider_token: token,
                });

                newUser.save(function (err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            }
          );
        } else {
          // For users that are already authunticated through other methods
          var user = req.user;

          user.name = profile.displayName;
          user.email = profile.emails[0].value;

          user.third_party_auth.push({
            provider_name: "google",
            provider_id: profile.id,
            provider_token: token,
          });

          user.save(function (err) {
            if (err) throw err;
            return done(null, user);
          });
        }
      }
    )
  );
};
