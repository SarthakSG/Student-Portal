var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var dashboard = require('.././Dashboard');

/* GET home page. */
router.get('/', function (req, res, next) {
     res.render('Faculty/Authentication/SignIn.ejs', { error: "", firebase: firebase });
});

router.post('/', function (req, res, next) {

    var payload = JSON.parse(req.body);
    console.log("payload : "+JSON.stringify(payload));
    const user = payload.user;
    console.log("user : "+user);


    if (user) {
        var userId = user.uid;
        var userInfoRef = firebase.database().ref('IILM-CET/Users/' + userId + '/AccountType');
        userInfoRef.on('value', snapshot => {
            if (snapshot != null) {

                if (snapshot.val() == 'Faculty'||snapshot.val() == 'Admin') {
                    res.redirect('/faculty/dashboard')
                } else {
                    res.redirect('/faculty/signin');
                }
            }
        });
    } else res.redirect('/faculty/signin');

    /* res.redirect('/faculty/dashboard')
    var userId = firebase.auth().currentUser.uid;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        if (error) {
            if (error.code == "auth/invalid-email") {
                res.render('Faculty/Authentication/SignIn.ejs', { error: "Email-id is invalid" });
            } else if (error.code == "auth/wrong-password") {
                res.render('Faculty/Authentication/SignIn.ejs', { error: "Password is incorrect" });
            } else if (error.code == "auth/user-not-found") {
                res.render('Faculty/Authentication/SignIn.ejs', { error: "No user found with given credentials  " });
            } else if (error.code == "auth/user-disabled") {
                res.render('Faculty/Authentication/SignIn.ejs', { error: "Your account is disabled!" });
            }
            console.log(error.code);
            console.log(error.message);
        }
    }).then(function (t) {
        res.redirect('/faculty/dashboard')
        var userId = firebase.auth().currentUser.uid;
         var userInfoRef = firebase.database().ref('IILM-CET/Users/' + userId + '/AccountType');
        if (t.emailVerified) res.redirect('/faculty/dashboard');else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
     }); */
});

module.exports = router;