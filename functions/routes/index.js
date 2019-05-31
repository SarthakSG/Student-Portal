var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

var serviceAccount = require('../student-portal-service-account.json');

 firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://student-portal-2017.firebaseio.com"
});


/* GET home page. */
router.get('/', function (req, res, next) {
    const user = firebase.auth().currentUser;
    res.render('index.ejs', { title: 'Student Portal' });
    
}); 

module.exports = router;