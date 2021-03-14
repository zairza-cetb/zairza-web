module.exports = (app, passport) => {
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // ---- For local sign in ----------
  app.post("/login", function (req, res) {
    passport.authenticate("local-login", function (err, user, info) {
      if (err) {
        res.status(404).json(err);
        return;
      }

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json(info);
      }
    })(req, res);
  });

  app.post("/signup", function (req, res) {
    passport.authenticate("local-signup", function (err, user, info) {
      console.log(err,user,info);
      if (err) {
        res.status(404).json(err);
        return;
      }

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json(info);
      }
    })(req, res);
  });

  // -------- For google sign in -------
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "/profile",
      failureRedirect: "/auth?failed=true",
    })
  );
};
