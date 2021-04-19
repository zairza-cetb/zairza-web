const express = require("express");
const router = express.Router();
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

const editableFields = new Set([
  "name",
  "email",
  "registrationNo",
  "newsletterSubscription",
  "wing",
  "branch",
]);

router.get("/me", checkIfAuthenticated, function (req, res, next) {
  res.json(req.user);
});

router.put("/edit", checkIfAuthenticated, async function (req, res, next) {
  if (!req.user.registrationNo && !req.body.registrationNo) {
    return res
      .status(403)
      .json({ status: "fail", message: "Registration number is required" });
  } else if (
    req.body.registrationNo &&
    (await req.user.checkValidRegistrationNo(req.body.registrationNo)) == false
  ) {
    return res.status(403).json({
      status: "fail",
      message:
        "Your registration number is not registered at Zairza. Please contact us to register you at Zairza",
    });
  } else {
    // Check for editable fields fields only

    var nonEditableFields = Object.keys(req.body).filter(
      (x) => !editableFields.has(x)
    );

    if (nonEditableFields.length > 0) {
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

router.delete("/", checkIfAuthenticated, function (req, res, next) {
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
