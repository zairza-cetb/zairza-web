const LocalStrategy = require("passport-local").Strategy;

module.exports = (passport) => {
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(function () {
          User.findOne({ email: email }, function (err, user) {
            if (err) return done(err);

            if (!user) return done(null, false,{message : "User does not exist"});

            if (!user.validPassword(password)) return done(null, false, {message: "Incorrect password"});
            else return done(null, user);
          });
        });
      }
    )
  );

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        process.nextTick(function () {
          User.findOne({ email: email }, function (err, existingUser) {
            if (err) return done(err);
            if (existingUser) return done(null, false, {message : "User already exists"});

            if (req.user) {
              var user = req.user;
              user.email = email;
              user.password = user.generateHash(password);
              user.save(function (err) {
                if (err) throw err;
                return done(null, user);
              });
            } else {
              var newUser = new User();

              newUser.email = email;
              newUser.password = newUser.generateHash(password);

              newUser.save(function (err) {
                if (err) throw err;

                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};
