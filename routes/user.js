const express = require("express");
const router = express.Router();

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
    : res
        .status(401)
        .json({ status: "fail", message: "User is not logged in" });
};

router.get("/me", checkUserLoggedIn, function (req, res, next) {
  res.json(req.user);
});

router.put("/edit", checkUserLoggedIn, async function (req, res, next) {
  if (!req.user.registration_no && !req.body.registration_no) {
    return res
      .status(403)
      .json({ status: "fail", message: "Registration number is required" });
  } else if (
    req.body.registration_no &&
    (await req.user.checkValidRegistrationNo(req.body.registration_no)) == false
  ) {
    return res.status(403).json({
      status: "fail",
      message:
        "Your registration number is not registered at Zairza. Please contact us to register you at Zairza",
    });
  } else {
    // Check for editable fields fields only

    var non_editable_fields = Object.keys(req.body).filter(
      (x) => !editable_fields.has(x)
    );

    if (non_editable_fields.length > 0) {
      return res
        .status(401)
        .json({ status: "fail", message: "Accessing unknown fields" });
    }

    User.findByIdAndUpdate(req.user.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "No user found",
          });
        }
        res.status(200).json({ status: "success", user });
      })
      .catch((err) => {
        return next(err);
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
      res.json({ status: "success", message: "User deleted successfully!" });
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
