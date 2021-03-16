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
        req.logIn(user, function (err) {
          if (err) {
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
      console.log(err, user, info);
      if (err) {
        res.status(404).json(err);
        return;
      }

      if (user) {
        req.logIn(user, function (err) {
          if (err) {
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
      successRedirect: "/me",
      failureRedirect: "/auth?failed=true",
    })
  );

  // -------- For github authentication -------
  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/github/cb/",
    passport.authenticate("github", {
      successRedirect: "/me",
      failureRedirect: "/auth?failed=true",
    })
  );

  // -------- for unlinking accounts ---------
  app.get("/unlink/:name", function (req, res, next) {
    var user = req.user;
    var organisation_name = req.params.name;
    var organisation_details = user.third_party_auth
      .filter((third_party) => third_party.provider_name == organisation_name)
      .pop();

    if (organisation_details) {
      user.third_party_auth.pull({ _id: organisation_details.id });
    }
    user.save(function (err) {
      res.sendStatus(200);
    });
  });
};
