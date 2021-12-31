const express = require("express");
const router = express.Router();
const admin = require("../firebase/firebaseService");
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

const team = [
  {
    position: "Coordinator",
    name: "Gunjan Giri",
    linkedin: "https://www.linkedin.com/in/gunjan-giri/",
    mail: "gunjangiri8410@gmail.com",
    image: "/images/new-landing/team.png",
  },
  {
    position: "Convenor",
    name: "Prateek Mohanty",
    linkedin: "https://www.linkedin.com/in/prateek-mohanty/",
    mail: "itsprateekmohanty@gmail.com",
    image: "/images/new-landing/team.png",
  },
  {
    position: "Design Lead",
    name: "Debanshu Samal",
    linkedin: "https://www.linkedin.com/in/debanshu-samal/",
    mail: "debanshusamal1999@gmail.com",
    image: "/images/new-landing/team.png",
  },
  {
    position: "Design Lead",
    name: "Stephen Rejinold",
    linkedin: "https://www.linkedin.com/in/stephenrejinold/",
    mail: "ejinoldstephen@gmail.com",
    image: "/images/new-landing/team.png",
  },
  {
    position: "Coordinator",
    name: "Gunjan Giri",
    linkedin: "https://www.linkedin.com/in/gunjan-giri/",
    mail: "gunjangiri8410@gmail.com",
    image: "/images/new-landing/team.png",
  },
  {
    position: "Convenor",
    name: "Prateek Mohanty",
    linkedin: "https://www.linkedin.com/in/prateek-mohanty/",
    mail: "itsprateekmohanty@gmail.com",
    image: "/images/new-landing/team.png",
  },
];

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.cookies["zToken"] != null) {
    admin
      .auth()
      .verifyIdToken(req.cookies["zToken"])
      .then((decodedToken) => {
        res.render("pages/newIndex", { loggedIn: true });
      })
      .catch((err) => {
        res.render("pages/newIndex", { loggedIn: false });
      });
  } else {
    res.render("pages/newIndex", { loggedIn: false });
  }
  //     .then((decodedToken) => {
  //       res.render("pages/index", { loggedIn: true });
  //     })
  //     .catch((err) => {
  //       res.render("pages/index", { loggedIn: false });
  //     });
  // } else {
  //   res.render("pages/index", { loggedIn: false });
  // }
});
router.get("/about", function (req, res, next) {
  if (req.cookies["zToken"] != null) {
    admin
      .auth()
      .verifyIdToken(req.cookies["zToken"])
      .then((decodedToken) => {
        res.render("pages/about", { loggedIn: true });
      })
      .catch((err) => {
        res.render("pages/about", { loggedIn: false });
      });
  } else {
    res.render("pages/about", { loggedIn: false });
  }
});

/*Get teams page */
router.get("/team", function (req, res, next) {
  if (req.cookies["zToken"] != null) {
    admin
      .auth()
      .verifyIdToken(req.cookies["zToken"])
      .then((decodedToken) => {
        res.render("pages/team", { data: { loggedIn: true, team: team } });
      })
      .catch((err) => {
        res.render("pages/team", { data: { loggedIn: false, team: team } });
      });
  } else {
    res.render("pages/team", { data: { loggedIn: false, team: team } });
  }
});

/* GET auth page. */
router.get("/auth", function (req, res, next) {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("pages/auth");
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

module.exports = router;
