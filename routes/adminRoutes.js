const express = require("express");
const router = express.Router();
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");
const sendMail = require("../utils/sendMail.js");

router.use(checkIfAuthenticated, function (req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  const error = new Error("Admin role required for accessing route");
  error.status = "fail";
  error.statusCode = 403;
  next(error);
});

router.get("/create-newsletter/", function (req, res, next) {
  res.render("pages/newsletterContent");
});

/* GET editor page. */
router.get("/newsletterDashboard", function (req, res, next) {
  res.render("pages/newsletterDashboard");
});

router.post("/send-newsletter/", function (req, res, next) {
  User.find({ newsletterSubscription: true }, function (err, users) {
    if (err) {
      return next(err);
    }
    if (users.length === 0) {
      return res.json({ status: "success" });
    }

    // Returns the function if error occurs on the first send
    let errorOccured = false;

    for (let i=0; i < users.length ; i++){
      sendMail(
        {
          email: users[i].email,
          ...req.body,
          dynamic_template_data: {
            name: users[i].name.split(" ")[0],
            unsubscribeLink:
              req.protocol +
              "://" +
              req.get("host") +
              "/unsubscribe#" +
              users[i]._id,
          },
        },
        function (err) {
          if (err && i==0) {
            errorOccured = true;
            return next(err);
          }
        }
      );

      if (errorOccured === true)
        return;
    }
    return res.json({ status: "success" });
  });
});

module.exports = router;
