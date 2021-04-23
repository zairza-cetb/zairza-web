const express = require("express");
const router = express.Router();
const admin = require("../firebase/firebaseService");
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

const editableFields = new Set([
  "name",
  "email",
  "registrationNo",
  "newsletterSubscription",
  "wing",
  "branch",
]);

// Check user is authenticated or not
router.use(checkIfAuthenticated);

router.get("/me", function (req, res, next) {
  res.json(req.user);
});

router.put("/edit", async function (req, res, next) {
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
        if (user.role == "restricted") {
          user.role = "user";
          user.save();
        }
        res.status(200).json({ status: "success", user });
      })
      .catch((err) => {
        return next(err);
      });
  }
});

router.delete("/", function (req, res, next) {
  User.findByIdAndRemove(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found ",
        });
      }
      admin
        .auth()
        .deleteUser(req.authId)
        .then(() => {
          return res.json({
            status: "success",
            message: "User deleted successfully!",
          });
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
