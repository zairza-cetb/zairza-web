const express = require("express");
const router = express.Router();
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

router.use(checkIfAuthenticated, function (req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  const error = new Error("Admin role required for accessing route");
  error.status = "fail";
  error.statusCode = 403;
  next(error);
});

router.get("/create-newsletter/",function (req, res, next) {
    res.render("pages/newsletterContent");
})

module.exports = router;
