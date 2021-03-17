var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
    res.render("pages/index");
})

/* GET auth page. */
router.get('/auth', function(req, res, next){
    res.render("pages/auth");
})

/* GET profile page. */
router.get('/me', function(req, res, next){
    res.render("pages/me");
})

/* GET settings page. */
router.get('/settings', function(req, res, next){
    res.render("pages/settings");
})

/* GET forgot password page. */
router.get('/reset/:id', function(req, res, next){
    res.render("pages/forgot_password");
})

/* GET profile page. */
router.get('/profile', function(req, res, next){
    res.render("pages/profile", );
})


module.exports = router;
