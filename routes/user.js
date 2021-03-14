var express = require("express");
var router = express.Router();

/* GET users listing. */
const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

router.get("/me", checkUserLoggedIn, function (req, res, next) {
  res.send(req.user);
});

module.exports = router;
