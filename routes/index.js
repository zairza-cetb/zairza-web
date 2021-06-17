const express = require("express");
const router = express.Router();
const admin = require("../firebase/firebaseService");
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

/* GET home page. */
router.get("/", function (req, res, next) {
  const poster = 'https://images.unsplash.com/photo-1623491351896-073b656b4205?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80';
    res.render("pages/index", { poster: poster });
});

/* GET auth page. */
router.get("/auth", function (req, res, next) {
  if (req.cookies["zToken"] != null) {
    admin
      .auth()
      .verifyIdToken(req.cookies["zToken"])
      .then((decodedToken) => {
        res.redirect("/me");
      })
      .catch((err) => {
        res.render("pages/auth");
      });
  } else {
    res.render("pages/auth");
  }
});

/* GET events page. */
router.get("/events", checkIfAuthenticated, function (req, res, next) {
  res.render("pages/dashboard/events");
});

/* GET forgot password page. */
router.get("/forgot", function (req, res, next) {
  res.render("pages/forgot_password");
});

/* GET profile page. */
router.get("/profile", checkIfAuthenticated, function (req, res, next) {
  if (!req.user) {
    return res.redirect("/");
  }
  let google = false,
    github = false;

  if ("google.com" in req.userInfo.firebase.identities) {
    google = true;
  }
  if ("github.com" in req.userInfo.firebase.identities) {
    github = true;
  }
  res.render("pages/profile", { user: req.user, google, github });
});

/* GET newPassword page. */
router.get("/forgot_password", function (req, res, next) {
  res.render("pages/newPassword");
});

router.get("/tmp", function (req, res, next) {
  res.render("pages/dashboard/template");
});
/* GET unsubscribe page. */
router.get("/unsubscribe", function (req, res, next) {
  res.render("pages/unsubscribe")
})

module.exports = router;
