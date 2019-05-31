var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var database = firebase.database();
var user;

router.get('/', (req, res) => {
    res.render('Student/Feedback.ejs');
});

router.post('/', (req, res) => {


    var idToken = req.body.t;

    console.log(idToken);


    firebase.auth().verifyIdToken(idToken).then((user) => {
        if (user != null) {
            var FeedbackObj = {
                Rating: req.body.star_rating,
                Suggestion: req.body.suggestions
            };
            ratingsRef = database.ref('IILM-CET/Feedback/' + user.uid).set(FeedbackObj);
            res.redirect('/student/dashboard');
        } else res.redirect('/student/signin');
    }).catch((e) => {
        console.log('Error : ' + e);

        res.render('Student/Authentication/SignIn.ejs', { error: 'Please Sign In' });
    })


});

module.exports = router;