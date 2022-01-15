const express = require("express");
const router = express.Router();
const admin = require("../firebase/firebaseService");
const checkIfAuthenticated = require("../firebase/firebaseCheckAuth");
const Events = require("../models/Events");

const team = [
  {
    position: "Convenor",
    name: "Prateek Mohanty",
    linkedin: "https://www.linkedin.com/in/prateek-mohanty/",
    mail: "itsprateekmohanty@gmail.com",
    image: "/images/new-landing/team/Prateek.webp",
  },
  {
    position: "Coordinator",
    name: "Gunjan Giri",
    linkedin: "https://www.linkedin.com/in/gunjan-giri/",
    mail: "gunjangiri8410@gmail.com",
    image: "/images/new-landing/team/Gunjan.webp",
  },
  {
    position: "Design Lead",
    name: "Debanshu Samal",
    linkedin: "https://www.linkedin.com/in/debanshu-samal/",
    mail: "debanshusamal1999@gmail.com",
    image: "/images/new-landing/team/Debanshu.webp",
  },
  {
    position: "Design Lead",
    name: "Stephen Rejinold",
    linkedin: "https://www.linkedin.com/in/stephenrejinold/",
    mail: "rejinoldstephen@gmail.com",
    image: "/images/new-landing/team/Stephen.webp",
  },
  {
    position: "Core Member",
    name: "Sai Prasad Nayak ",
    linkedin: "https://www.linkedin.com/in/sainayak/",
    mail: "saiprasadnayak6858@gmail.com",
    image: "/images/new-landing/team/Sai.webp",
  },
  {
    position: "Core Member",
    name: "Biswajit patra ",
    linkedin: "https://www.linkedin.com/in/biswajitpatra-/",
    mail: "patrabiswajit133@gmail.com",
    image: "/images/new-landing/team/Biswajit.webp",
  },
  {
    position: "Core Member",
    name: "Bibek Panda",
    linkedin: "https://www.linkedin.com/in/bibek-panda-a8ba66174/",
    mail: "rajendra21101999@gmail.com",
    image: "/images/new-landing/team/Bibek.webp",
  },
  {
    position: "Core Member",
    name: "Amrutanshoo Sahoo",
    linkedin: "https://www.linkedin.com/in/amrutanshu-sahoo/",
    mail: "sahooamrutanshu7@gmail.com",
    image: "/images/new-landing/team/Amrutanshu.webp",
  },
  {
    position: "Core Member",
    name: "Dwarikanath Mishra",
    linkedin: "https://www.linkedin.com/in/dwarikanathmishra/",
    mail: "dwarikanathmishra7@gmail.com",
    image: "/images/new-landing/team/Dwarika.webp",
  },
  {
    position: "Core Member",
    name: "Tanisha Panda",
    linkedin: "https://www.linkedin.com/in/tanisha-panda-253977195/",
    mail: "tanishapanda2@gmail.com",
    image: "/images/new-landing/team/Tanisha.webp",
  },
  {
    position: "Core Member",
    name: "Haritosh Tripathy",
    linkedin: "https://www.linkedin.com/in/haritosh-tripathy-625252196/",
    mail: "haritoshtripathy@gmail.com",
    image: "/images/new-landing/team/Haritosh.webp",
  },
  {
    position: "Core Member",
    name: "Shibani Shankar Dash",
    linkedin: "https://www.linkedin.com/in/ssd71/",
    mail: "shibanidash71@gmail.com",
    image: "/images/new-landing/team/Shibani.webp",
  },
  {
    position: "Core Member",
    name: "Satyajeet Malla",
    linkedin: "https://www.linkedin.com/in/satyajeet-malla-89a818193/",
    mail: "satyajeet.malla2@gmail.com",
    image: "/images/new-landing/team/Malla.webp",
  },
  {
    position: "Core Member",
    name: "Sourajeet Mohanty",
    linkedin: "https://www.linkedin.com/in/sourajeet-mohanty-1223a2185/",
    mail: "sourajeetm717@gmail.com",
    image: "/images/new-landing/team/Sourajit.webp",
  },
  {
    position: "Core Member",
    name: "Subhankit Prusty",
    linkedin: "https://www.linkedin.com/in/subhankit-prusti-1543ba1b0/",
    mail: "subhankitprusti2000@gmail.com",
    image: "/images/new-landing/team/Subhankit.webp",
  },
  {
    position: "Core Member",
    name: "Soumik Kundu",
    linkedin: "https://www.linkedin.com/in/soumik-kundu-9509831a7/",
    mail: "soumikkundu25@gmail.com",
    image: "/images/new-landing/team/Kundu.webp",
  },
  {
    position: "Core Member",
    name: "Satyam Mishra",
    linkedin: "https://www.linkedin.com/in/satyam-mishra-906a401b4/",
    mail: "sam.mishra20@gmail.com",
    image: "/images/new-landing/team/Satyam.webp",
  },
  {
    position: "Core Member",
    name: "Suvam Pattnaik",
    linkedin: "https://www.linkedin.com/in/suvam-pattnaik-70b9a3216/",
    mail: "#",
    image: "/images/new-landing/team/Suvam.webp",
  },
  {
    position: "Core Member",
    name: "Biswajeet Ray",
    linkedin: "https://www.linkedin.com/in/biswajeet-ray-ba0964170/",
    mail: "#",
    image: "/images/new-landing/team/Biswajeet.webp",
  },
  {
    position: "Core Member",
    name: "Silla Priyadarshini",
    linkedin: "https://www.linkedin.com/in/silla-priyadarshni-647b43141/",
    mail: "priyadarshanisilla@gmail.com",
    image: "/images/new-landing/team/Silla.webp",
  },
  {
    position: "Core Member",
    name: "Rahulraj Senapati",
    linkedin: "https://www.linkedin.com/in/rahulraj-senapati-662b77155/",
    mail: "#",
    image: "/images/new-landing/team/Rahul.webp",
  },
  {
    position: "Core Member",
    name: "Saurav Kumar Rath",
    linkedin: "https://www.linkedin.com/in/skr2020/",
    mail: "rathsauravkumar@gmail.com",
    image: "/images/new-landing/team/Sourav.webp",
  },
  {
    position: "Core Member",
    name: "Rohnak Agarwal",
    linkedin: "https://www.linkedin.com/in/rohnak-agarwal-5558391a0/",
    mail: "#",
    image: "/images/new-landing/team/Rohnak.webp",
  },
  {
    position: "Core Member",
    name: "Shaktikanta Das",
    linkedin: "https://www.linkedin.com/in/shaktikantadas/",
    mail: "https://www.linkedin.com/in/shaktikantadas/",
    image: "/images/new-landing/team/Shaktikanta.webp",
  },
  {
    position: "Core Member",
    name: "Ishan Ranasingh",
    linkedin: "https://www.linkedin.com/in/ishan-ranasingh-689687b2/",
    mail: "#",
    image: "/images/new-landing/team/Ishan.webp",
  },
  {
    position: "Core Member",
    name: "Ashish Kumar Panigrahy ",
    linkedin: "https://www.linkedin.com/in/akpdata/",
    mail: "akpanigrahy26@gmail.com",
    image: "/images/new-landing/team/Ashish.webp",
  },
];

const article = [
  {
    title: "Overfitting and Underfitting of a ML Model",
    des: "have you ever given a thought behind the poor performance of your ML model?",
    img: "/images/blogs/5.webp",
    link: "https://blog.zairza.in/overfitting-and-underfitting-of-a-machine-learning-model-2e797622c3b5"
  },
  {
    title: "Frequently Asked Interviw Questions in React-Redux",
    des: "If you guys are about to face a react-redux interview, this article is for you.",
    img: "/images/blogs/6.webp",
    link: "https://blog.zairza.in/frequently-asked-interview-questions-in-react-redux-bc774733b449"
  },
  {
    title: "Sentiment Analysis of Restaurant Reviews",
    des: "Hello everyone! I hope you all are doing good. In this blog ...",
    img: "/images/blogs/3.webp",
    link: "https://blog.zairza.in/sentiment-analysis-of-restaurant-reviews-dab25c69fa8"
  },
  {
    title: 'What is "BITCOIN" And Its Mining Process',
    des: "Before going through this article you must know about the basics of blockchain",
    img: "/images/blogs/10.webp",
    link: "https://blog.zairza.in/https-medium-com-pruthwirajnayak-what-is-bitcoin-and-how-its-mining-process-works-8cf5aa51d87f"

  },

  {
    title: "Convolutional Neural Network (CNN)",
    des: "Ever wondered, how Facebook can recognise the faces. What it uses for that, Let's reveal it.",
    img: "/images/blogs/1.webp",
    link: "https://blog.zairza.in/covolutional-neural-networks-7e2397c49536"
  },
  {
    title: "Artificial Neural Networks (ANN)",
    des: "Are you excited about ANN? Are you excited about exploring a bit about the human brain?",
    img: "/images/blogs/2.webp",
    link: "https://blog.zairza.in/artificial-neural-networks-51ed8ca49217"
  },
  {
    title: "OAuth Using MEVN Stack",
    des: "If you use nodejs and you need to implement Oauth or just looking forward to learning something new in server side...",
    img: "/images/blogs/7.webp",
    link: "https://blog.zairza.in/oauth-using-mevn-stack-4b4a383dae08"

  },
  {
    title: "A Guide To Dual Booting",
    des: "Today, dual booting has become a go-to procedure that a lot of developers opt for, be it due to having complete access over ...",
    img: "/images/blogs/8.webp",
    link: "https://blog.zairza.in/a-guide-to-dual-booting-d9dffe042ee6"

  },
  {
    title: "Home automation: Making Our Lives Easier",
    des: "The Home Automation is a wireless home automation system that is supposed",
    img: "/images/blogs/9.webp",
    link: "https://blog.zairza.in/home-automation-making-our-lives-easier-a782ee067ea8"

  },
  {
    title: "How ReactJS Works Behind The Scene",
    des: "Hello guys! Learning react is simple. Here, in this article ...",
    img: "/images/blogs/4.webp",
    link: "https://blog.zairza.in/how-reactjs-works-behind-the-scene-e25689f4b2c5"
  },
  {
    title: "Modern Radios: Miles Of Range And Years Of ...",
    des: "Age old definition of radios relates to 'radios drain battery'.",
    img: "/images/blogs/11.webp",
    link: "https://blog.zairza.in/modern-radios-miles-of-range-and-years-of-battery-life-6ca1a690c4d9"

  },
];

/* GET home page. */
router.get("/", function (req, res, next) {

  let someArticles = article.slice(0, 5)

  if (req.cookies["zToken"] != null) {
    admin
      .auth()
      .verifyIdToken(req.cookies["zToken"])
      .then((decodedToken) => {
        res.render("pages/newIndex", { data: { loggedIn: true, articles: someArticles } });
      })
      .catch((err) => {
        res.render("pages/newIndex", { data: { loggedIn: false, articles: someArticles } });
      });
  } else {
    res.render("pages/newIndex", { data: { loggedIn: false, articles: someArticles } });
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
router.get("/blogs", function (req, res, next) {
  if (req.cookies["zToken"] != null) {
    admin
      .auth()
      .verifyIdToken(req.cookies["zToken"])
      .then((decodedToken) => {
        res.render("pages/blogs", { data: { loggedIn: true, blog: article } });
      })
      .catch((err) => {
        res.render("pages/blogs", { data: { loggedIn: false, blog: article } });
      });
  } else {
    res.render("pages/blogs", { data: { loggedIn: false, blog: article } });
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

// router.get("/blogs", function (req, res) {
//   res.render("pages/blogs");
// });

module.exports = router;
