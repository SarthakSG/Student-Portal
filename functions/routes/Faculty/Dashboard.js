var express = require('express');
var router = express.Router();
var year_branch;
var firebase = require('firebase-admin');
var uploadDoc = require('./DocumentUpload');
router.use('/uploadDoc', uploadDoc);

router.get('/', function (req, res, next) {

    res.render('Faculty/Dashboard.ejs', {
        title: 'Faculty Dashboard'
    });
    /* firebase.auth().verifyIdToken(idToken).then((user) => {
        if (user != null) {
            var userId = user.uid;
            console.log(userId);
            var userInfoRef = firebase.database().ref('IILM-CET/Users/' + userId + '/AccountType');
            userInfoRef.once('value', snapshot => {
             

                if (snapshot != null) {

                    if (snapshot.val() == 'Faculty' || snapshot.val() == 'Admin') {
                        console.log("Rendering");

                        if (user.email_verified) res.render('Faculty/Dashboard.ejs', {
                            title: 'Faculty Dashboard',
                            displayName: user.name,
                            email: user.email,
                            uid: user.uid
                        }); else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
                    } else {
                        console.log("User doesn't have enough permissions");

                        res.render('error.ejs', { title: 'Error',error: `You don't have enough permissions.`});

                    }
                }
            });
        } else res.redirect('/faculty/signin');
    }).catch((e) => {
        res.render('error.ejs', { title: 'Error',error: "User Session Expired. Please sign in."});
    }) */



    /* if (user) {
        var userId = user.uid;
        var userInfoRef = firebase.database().ref('IILM-CET/Users/' + userId + '/AccountType');
        userInfoRef.on('value', snapshot => {
            if (snapshot != null) {

                if (snapshot.val() == 'Faculty'||snapshot.val() == 'Admin') {
                    if (user.emailVerified) res.render('Faculty/Dashboard.ejs', {
                        title: 'Faculty Dashboard',
                        displayName: user.displayName,
                         email: user.email, 
                         uid: user.uid
                    }); else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
                } else {
                    res.redirect('/faculty/signin');
                }
            }
        });
    } else res.redirect('/faculty/signin'); */
});


router.post('/getDoc', function (req, res, next) {
    var idToken = req.body.t;

    console.log(idToken);


    firebase.auth().verifyIdToken(idToken).then((user) => {
        console.log('User : ' + JSON.stringify(user));

        if (user != null) {

            if ((user.email.match(/.*@iilmcet.ac.in$/g) == null) && user.email !== 'sarthak.sg@gmail.com') {
                console.log("User doesn't have enough permissions");
                res.render('error.ejs', { error: "User doesn't have enough permissions" })
            }
            else {
                console.log(user.email);
                var userId = user.uid;
                console.log(userId);
                var doc = [{}];
                var DocRef = firebase.database().ref('IILM-CET/' + req.body.SelectDocumentType);
                var docType = req.body.SelectDocumentType;
                year_branch = parseInt(req.body.SelectYear * 10) + parseInt(req.body.SelectBranch);
                DocRef.orderByChild("year_branch").equalTo(year_branch).once('value', function (snapshot) {
                    var i = 0;
                    snapshot.forEach(function (childsnapshot) {
                        doc[i++] = childsnapshot.val();
                    });
                    doc.reverse();

                }).then(() => {
                    res.render('Faculty/DocumentListView.ejs', { title: docType, doc: doc });
                });
            }

        } else res.redirect('/faculty/signin');
    }).catch((e) => {
        console.log('Error : ' + e);

        res.render('Faculty/Authentication/SignIn.ejs', { error: 'Please Sign In' });
    })


});

module.exports = router;