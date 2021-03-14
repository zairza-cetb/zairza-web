var GitHubStrategy = require("passport-github").Strategy;

module.exports = (passport) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/cb",
      },
      function (req, token, refreshToken, profile, done) {
        console.log(token,profile, refreshToken, profile);
        if (!req.user) {
          User.findOne(
            { email: profile.emails[0].value },
            function (err, user) {
              if (err) return done(err);

              if (user) {
                github_auth = user.third_party_auth
                  .filter(
                    (third_party) => third_party.provider_name == "github"
                  )
                  .pop();
                if (!github_auth) {
                  user.third_party_auth.push({
                    provider_name: "github",
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
                  provider_name: "github",
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
          // For users that are already authenticated through other methods
          var user = req.user;

          user.name = profile.displayName;
          user.email = profile.emails[0].value;

          user.third_party_auth.push({
            provider_name: "github",
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
