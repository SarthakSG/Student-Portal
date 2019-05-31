var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var dashboard = require('.././Dashboard');

/* GET home page. */
router.get('/', function (req, res, next) {
   res.render('Student/Authentication/SignIn.ejs', { error: "", firebase: firebase });
});

/* router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        if (error) {
            if (error.code == "auth/invalid-email") {
                res.render('Student/Authentication/SignIn.ejs', { error: "Email-id is invalid" });
            } else if (error.code == "auth/wrong-password") {
                res.render('Student/Authentication/SignIn.ejs', { error: "Password is incorrect" });
            } else if (error.code == "auth/user-not-found") {
                res.render('Student/Authentication/SignIn.ejs', { error: "No user found with given credentials  " });
            } else if (error.code == "auth/user-disabled") {
                res.render('Student/Authentication/SignIn.ejs', { error: "Your account is disabled!" });
            }
            console.log(error.code);
            console.log(error.message);
        }
    }).then(function (t) {
        if (t != null && t.emailVerified) res.redirect('/student/dashboard');else res.render('Student/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
    });
}); */

module.exports = router;