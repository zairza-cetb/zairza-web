module.exports = (app, passport) => {
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // ---- For local sign in ----------
  app.post("/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (err) {
        res.status(404).json(err);
        return;
      }

      if (user) {
        req.logIn(user, function(err){
          if(err){
            return res.status(500).json(err);
          }
          res.status(200).json(user.id);
        });
      } else {
        res.status(401).json(info);
      }
    })(req, res, next);
  });

  app.post("/signup", function (req, res, next) {
    passport.authenticate("local-signup", function (err, user, info) {
      console.log(err,user,info);
      if (err) {
        res.status(404).json(err);
        return;
      }

      if (user) {
        req.logIn(user, function(err){
          if(err){
            res.status(500).json(err);
          }
          res.status(200).json(user.id);
        });
      } else {
        res.status(401).json(info);
      }
    })(req, res, next);
  });

  // -------- For google authentication -------
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/cb/",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/auth?failed=true",
    })
  );

};
