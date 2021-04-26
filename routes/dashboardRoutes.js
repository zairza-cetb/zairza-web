const express = require("express");
const router = express.Router();
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");
const fetch = require("node-fetch");

/* GET dashboard page. */
router.get("/me", checkIfAuthenticated, function (req, res, next) {
  res.render("pages/dashboard/index", { user: req.user });
});

/* GET projects page. */
router.get("/projects", checkIfAuthenticated, function (req, res, next) {
  fetch("https://api.github.com/users/zairza-cetb/repos?sort=updated")
    .then((res) => res.json())
    .then((data) => {
      return res.render("pages/dashboard/projects", { data });
    });
});

module.exports = router;
