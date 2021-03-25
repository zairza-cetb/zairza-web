const nodemailer = require("nodemailer");
const ResetRequest = require("../models/ResetRequest");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    type: "OAuth2",
    user: process.env.ZAIRZA_EMAIL,
    clientId: process.env.ZAIRZA_EMAIL_CLIENT_ID,
    clientSecret: process.env.ZAIRZA_EMAIL_CLIENT_SECRET,
    refreshToken: process.env.ZAIRZA_EMAIL_REFRESH_TOKEN,
  },
});

module.exports = (app, passport) => {
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  //----- For forgot password -------
  app.post("/forgot", function (req, res, next) {
    var email = req.body.email;
    User.findOne({ email: email }, function (err, existingUser) {
      if (err) return res.status(500).send(err);

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const website_url = req.protocol + "://" + req.headers.host + req.baseUrl;

      ResetRequest.create({ user: existingUser }, function (err, request) {
        if (err) throw err;

        // Send an E-Mail with a password reset link with id of the request
        transporter.sendMail(
          {
            from: process.env.ZAIRZA_EMAIL,
            to: existingUser.email,
            subject: "Password reset",
            text: `Hi, \t\nWe received a request to reset your Zairza account's password. If this wasn't you, you can safely ignore this email, otherwise please go to the following link to reset your password:\n${website_url}/forgot/${request._id}\n\n\nThis link will be valid for 10 mins.`,
          },
          function (error, info) {
            if (error) {
              message = "Sorry, There seems to be a problem at our end";
              res.status(500).json({ message });
            } else {
              res.status(200).json({success: true});
            }
          }
        );
      });
    });
  });
  app.post("/forgot/:token", function (req, res, next) {
    ResetRequest.findByIdAndDelete(req.params.token, function (err, request) {
      if (err) {
        return res.status(500).json({ message: "Some error occured" });
      }
      if (!request) {
        return res.status(404).json({ message: "Invalid Link" });
      }
      User.findById(request.user, function (err, user) {
        if (err) {
          return res.status(500).json({ message: "Some error occured" });
        }
        user.password = user.generateHash(req.body.password);
        user.save(function (err) {
          if (err) throw err;
          res.status(200).json({success: true});
        });
      });
    });
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
      // console.log(err, user, info);
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

  app.get("/popup", (req, res, next) => {
    res.render("pages/authPopCallback", { layout: false, success: true });
  });
  app.get("/failed_popup", (req, res, next) => {
    res.render("pages/authPopCallback", { layout: false, success: false });
  });
  // -------- For google authentication -------
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/cb/",
    passport.authenticate("google", {
      successRedirect: "/popup",
      failureRedirect: "/failed_popup",
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
      successRedirect: "/popup",
      failureRedirect: "/failed_popup",
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
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.sendStatus(200);
    });
  });
};
