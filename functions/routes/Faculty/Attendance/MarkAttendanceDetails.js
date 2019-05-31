var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('Faculty/Attendance/MarkAttendanceDetails.ejs', { title: "Attendance" });
    //const user = firebase.auth().currentUser
    /* var removeListener = firebase.auth().onAuthStateChanged(function (user) {
        if (user) res.render('Faculty/Attendance/MarkAttendanceDetails.ejs', { title: "Attendance", displayName: user.displayName, error: "" });
        else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please Sign In" });

        /* if (user) {
            var uid = user.uid;
            var userInfoRef = firebase.database().ref('IILM-CET/Users/' + uid + '/AccountType');
            userInfoRef.on('value', snapshot => {
                if (snapshot != null) {

                    if (snapshot.val() == 'Faculty') {
                        if (user.emailVerified) res.render('Faculty/Attendance/MarkAttendanceDetails.ejs', { title: "Attendance", displayName: user.displayName, error: "" });else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
                    } else {
                        res.redirect('/faculty/signin');
                    }
                }
            });
        } else res.redirect('/faculty/signin'); 
    });
    removeListener(); */
});

module.exports = router;