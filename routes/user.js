var express = require("express");
var router = express.Router();

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
    // Deleting confidential fields
    delete req.body.third_party_auth;
    delete req.body.password;

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
