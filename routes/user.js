var express = require("express");
var router = express.Router();

const editable_fields = new Set([
  "name",
  "email",
  "registration_no",
  "newsletter_subscription",
]);

/* GET users listing. */
const checkUserLoggedIn = (req, res, next) => {
  req.user
    ? next()
    : res.status(401).json({ message: "User is not logged in" });
};

router.get("/me", checkUserLoggedIn, function (req, res, next) {
  res.json(req.user);
});

router.put("/edit", checkUserLoggedIn, function (req, res, next) {
  if (!req.user.registration_no && !req.body.registration_no) {
    res.status(403).json({ message: "Registration number is required" });
  } else if (
    req.body.registration_no &&
    req.user.checkValidRegistrationNo(req.body.registration_no) == false
  ) {
    res.status(403).json({
      message:
        "Your registration number is not registered at Zairza. Please contact us to register you at Zairza",
    });
  } else {
    // Check for editable fields fields only

    var non_editable_fields = Object.keys(req.body).filter(
      (x) => !editable_fields.has(x)
    );

    if (non_editable_fields.length > 0) {
      return res.status(401).json({
        message: "Accessing undefined fields",
      });
    }

    User.findByIdAndUpdate(req.user.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "No user found",
          });
        }
        res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(404).json({
          message: "Error while updating the user",
        });
      });
  }
});

router.delete("/", checkUserLoggedIn, function (req, res, next) {
  User.findByIdAndRemove(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found ",
        });
      }
      req.logout();
      res.json({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Could not delete user ",
      });
    });
});

module.exports = router;
