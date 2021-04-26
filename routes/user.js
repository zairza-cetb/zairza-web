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

router.get("/me", checkIfAuthenticated, function (req, res, next) {
  res.json(req.user);
});

router.put("/edit", checkIfAuthenticated, function (req, res, next) {
  if (!req.user.registrationNo && !req.body.registrationNo) {
    return res
      .status(403)
      .json({ status: "fail", message: "Registration number is required" });
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

    User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true },
      async function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(404).json({
            message: "No user found",
          });
        }

        if (req.body.registrationNo) {
          if (
            user.role === "restricted" &&
            (await req.user.checkValidRegistrationNo(
              req.body.registrationNo
            )) === true
          ) {
            user.role = "user";
            user.save();
          }
        }

        res.status(200).json({ status: "success", user });
      }
    );
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

const isRoleUser = [
  checkIfAuthenticated,
  (req, res, next) => {
    if (req.user.role === "restricted") {
      const error = new Error("User privilage required");
      error.status = "fail";
      error.statusCode = 403;
      return next(error);
    }
    next();
  },
];

router.post("/newsletter", isRoleUser, function (req, res, next) {
  User.findByIdAndUpdate(
    req.user.id,
    { newsletterSubscription: req.body.newsletterSubscription },
    function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).json({
          message: "No user found",
        });
      }
      return res.json({ status: "success" });
    }
  );
});

module.exports = router;
