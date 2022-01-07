const express = require("express");
const router = express.Router();
const admin = require("../firebase/firebaseService");
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");

const team = [
  {
    position: "Convenor",
    name: "Prateek Mohanty",
    linkedin: "https://www.linkedin.com/in/prateek-mohanty/",
    mail: "itsprateekmohanty@gmail.com",
    image: "/images/new-landing/team/Prateek.jpg",
  },
  {
    position: "Coordinator",
    name: "Gunjan Giri",
    linkedin: "https://www.linkedin.com/in/gunjan-giri/",
    mail: "gunjangiri8410@gmail.com",
    image: "/images/new-landing/team/Gunjan.jpg",
  },
  {
    position: "Design Lead",
    name: "Debanshu Samal",
    linkedin: "https://www.linkedin.com/in/debanshu-samal/",
    mail: "debanshusamal1999@gmail.com",
    image: "/images/new-landing/team/Debanshu.jpg",
  },
  {
    position: "Design Lead",
    name: "Stephen Rejinold",
    linkedin: "https://www.linkedin.com/in/stephenrejinold/",
    mail: "rejinoldstephen@gmail.com",
    image: "/images/new-landing/team/Stephen.jpg",
  },
  {
    position: "Core Member",
    name: "Sai Prasad Nayak ",
    linkedin: "https://www.linkedin.com/in/sainayak/",
    mail: "saiprasadnayak6858@gmail.com",
    image: "/images/new-landing/team/Sai.jpg",
  },
  {
    position: "Core Member",
    name: "Biswajit patra ",
    linkedin: "https://www.linkedin.com/in/biswajitpatra-/",
    mail: "patrabiswajit133@gmail.com",
    image: "/images/new-landing/team/Biswajeet.jpg",
  },
  {
    position: "Core Member",
    name: "Bibek Panda",
    linkedin: "https://www.linkedin.com/in/bibek-panda-a8ba66174/",
    mail: "rajendra21101999@gmail.com",
    image: "/images/new-landing/team/Bibek.jpg",
  },
  {
    position: "Core Member",
    name: "Amrutanshoo Sahoo",
    linkedin: "https://www.linkedin.com/in/amrutanshu-sahoo/",
    mail: "sahooamrutanshu7@gmail.com",
    image: "/images/new-landing/team/Amrutanshu.jpg",
  },
  {
    position: "Core Member",
    name: "Dwarikanath Mishra",
    linkedin: "https://www.linkedin.com/in/dwarikanathmishra/",
    mail: "dwarikanathmishra7@gmail.com",
    image: "/images/new-landing/team/Dwarika.jpg",
  },
  {
    position: "Core Member",
    name: "Tanisha Panda",
    linkedin: "https://www.linkedin.com/in/tanisha-panda-253977195/",
    mail: "tanishapanda2@gmail.com",
    image: "/images/new-landing/team/Tanisha.jpg",
  },
  {
    position: "Core Member",
    name: "Haritosh Tripathy",
    linkedin: "https://www.linkedin.com/in/haritosh-tripathy-625252196/",
    mail: "haritoshtripathy@gmail.com",
    image: "/images/new-landing/team/Haritosh.jpg",
  },
  {
    position: "Core Member",
    name: "Shibani Shankar Dash",
    linkedin: "https://www.linkedin.com/in/ssd71/",
    mail: "shibanidash71@gmail.com",
    image: "/images/new-landing/team/Shibani.jpg",
  },
  {
    position: "Core Member",
    name: "Satyam Mishra",
    linkedin: "https://www.linkedin.com/in/satyam-mishra-906a401b4/",
    mail: "sam.mishra20@gmail.com",
    image: "/images/new-landing/team/Satyam.jpg",
  },
  {
    position: "Core Member",
    name: "Subhankit Prusty",
    linkedin: "https://www.linkedin.com/in/subhankit-prusti-1543ba1b0/",
    mail: "subhankitprusti2000@gmail.com",
    image: "/images/new-landing/team/Subhankit.jpg",
  },
  {
    position: "Core Member",
    name: "Suvam Pattnaik",
    linkedin: "https://www.linkedin.com/in/suvam-pattnaik-70b9a3216/",
    mail: "#",
    image: "/images/new-landing/team/Suvam.jpg",
  },
  {
    position: "Core Member",
    name: "Silla Priyadarshini",
    linkedin: "https://www.linkedin.com/in/silla-priyadarshni-647b43141/",
    mail: "priyadarshanisilla@gmail.com",
    image: "/images/new-landing/team/Silla.jpg",
  },
  {
    position: "Core Member",
    name: "Rahulraj Senapati",
    linkedin: "https://www.linkedin.com/in/rahulraj-senapati-662b77155/",
    mail: "#",
    image: "/images/new-landing/team/Rahul.jpg",
  },
  {
    position: "Core Member",
    name: "Biswajeet Ray",
    linkedin: "https://www.linkedin.com/in/biswajeet-ray-ba0964170/",
    mail: "#",
    image: "/images/new-landing/team/Biswajit.jpg",
  },
  {
    position: "Core Member",
    name: "Saurav Kumar Rath",
    linkedin: "https://www.linkedin.com/in/skr2020/",
    mail: "rathsauravkumar@gmail.com",
    image: "/images/new-landing/team/Sourav.jpg",
  },
  {
    position: "Core Member",
    name: "Rohnak Agarwal",
    linkedin: "https://www.linkedin.com/in/rohnak-agarwal-5558391a0/",
    mail: "#",
    image: "/images/new-landing/team/Rohnak.jpg",
  },
  {
    position: "Core Member",
    name: "Shaktikanta Das",
    linkedin: "https://www.linkedin.com/in/shaktikantadas/",
    mail: "https://www.linkedin.com/in/shaktikantadas/",
    image: "/images/new-landing/team/Shaktikanta.jpg",
  },
  {
    position: "Core Member",
    name: "Ishan Ranasingh",
    linkedin: "https://www.linkedin.com/in/ishan-ranasingh-689687b2/",
    mail: "#",
    image: "/images/new-landing/team/Ishan.jpg",
  },
  {
    position: "Core Member",
    name: "Ashish Kumar Panigrahy ",
    linkedin: "https://www.linkedin.com/in/akpdata/",
    mail: "akpanigrahy26@gmail.com",
    image: "/images/new-landing/team/Ashish.jpg",
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

router.get("/domain", function (req, res, next) {
  if (req.cookies["zToken"] != null) {
    admin
      .auth()
      .verifyIdToken(req.cookies["zToken"])
      .then((decodedToken) => {
        res.render("pages/domain", { loggedIn: true });
      })
      .catch((err) => {
        res.render("pages/domain", { loggedIn: false });
      });
  } else {
    res.render("pages/domain", { loggedIn: false });
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

router.get("/blogs", function (req, res) {
  res.render("pages/blogs");
});

module.exports = router;
