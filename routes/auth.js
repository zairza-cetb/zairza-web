module.exports = (app, passport) => {
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // ---- For local sign in ----------
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/auth?failed=true",
    })
  );

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/auth?falied=true",
    }),
    function(req,res){
      console.log()
    }
  );

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
