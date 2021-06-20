const express = require("express");
const partials = require("express-partials");
const router = express.Router();
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");
const fetch = require("node-fetch");
const ValidRegNos = require("../models/ValidRegNos");

router.use(partials());

/* GET dashboard page. */
router.get("/me", checkIfAuthenticated, function (req, res, next) {
  ValidRegNos.count({}, function (err, count) {
    if (err) {
      return next(err);
    }
    fetch("https://api.github.com/users/zairza-cetb/repos?sort=updated_at")
      .then((res) => res.json())
      .then((data) => {
        return res.render("pages/dashboard/index", {
          user: req.user,
          projectsCount: data.length,
          membersCount: count,
          userPicture: req.userInfo.picture,
          layout: "pages/dashboard/base",
        });
      });
  });
});

/* GET projects page. */
router.get("/projects", checkIfAuthenticated, function (req, res, next) {
  fetch("https://api.github.com/users/zairza-cetb/repos?sort=updated_at")
    .then((res) => res.json())
    .then((data) => {
      return res.render("pages/dashboard/projects", {
        projects: data,
        user: req.user,
        userPicture: req.userInfo.picture,
        layout: "pages/dashboard/base",
      });
    });
});


/* GET poster uplaod page. */
router.get(
  "/eventPosterUpload",
  checkIfAuthenticated,
  function (req, res, next) {
    res.render("pages/dashboard/eventPosterUpload", {
      user: req.user,
      userPicture: req.userInfo.picture,
      layout: "pages/base",
    });
  }
);


module.exports = router;
