var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

/* GET home page. */
router.get('/', function (req, res, next) {
    var removeListener = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.auth().signOut().catch(function (error) {
                console.log(error.message);
            }).then(function (t) {
                res.redirect('/');
            });
        }
    });
    removeListener();
});

module.exports = router;