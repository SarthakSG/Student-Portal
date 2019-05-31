var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var database = firebase.database();
var user;

router.get('/', (req, res) => {
    res.render('Faculty/RateAndSuggest.ejs');
});

router.post('/', (req, res) => {
    var emailHash = user.email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    var ratingObj = {
        Rating: req.body.star_rating,
        Suggestion: req.body.suggestions
    };
    ratingsRef = database.ref('IILM-CET/RatingsAndSuggestions/' + emailHash).set(ratingObj);
    res.redirect('/faculty/dashboard');
});

module.exports = router;