const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const local_auth = require("./local_auth.js");
const google_auth = require("./google_auth.js");
const github_auth = require("./github_auth.js");

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  local_auth(passport);
  google_auth(passport);
  github_auth(passport);
  
};
