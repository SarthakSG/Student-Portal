var express = require('express');
var router = express.Router();
var year_branch;
var firebase = require('firebase-admin');

router.get('/', function (req, res, next) {

    res.render('Student/Dashboard.ejs', { title: 'Student Dashboard'});
   /*  const user = firebase.auth().currentUser;

    var removeListener = firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            if (user.emailVerified) res.render('Student/Dashboard.ejs', { title: 'Student Dashboard', displayName: user.displayName ,email:user.email,uid:user.uid}); else res.render('Student/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
        } else res.redirect('/student/signin');
    });
    removeListener(); */
});

router.post('/getDoc', function (req, res, next) {

    console.log('Body : '+JSON.stringify(req.body));
    

    var doc = [{}];
    var DocRef = firebase.database().ref('IILM-CET/' + req.body.SelectDocumentType);
    var docType = req.body.SelectDocumentType;
    year_branch = parseInt(req.body.SelectYear * 10) + parseInt(req.body.SelectBranch);
    DocRef.orderByChild("year_branch").equalTo(year_branch).on('value', function (snapshot) {
        var i = 0;
        snapshot.forEach(function (childsnapshot) {
            doc[i++] = childsnapshot.val();
        });
        doc.reverse();
        res.render('Student/DocumentListView.ejs', { title: docType, doc: doc});
    });
});

module.exports = router;