var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');


router.get('/',(req,res,next)=>{
    res.render('Faculty/Profile.ejs');
    var idToken = req.query.t;
    firebase.auth().verifyIdToken(idToken).then((user) => {
        console.log('User : '+user);
        
        if(user){
            res.render('Faculty/Profile.ejs', {
                displayName: user.name,
                 email: user.email, 
                 uid: user.uid
            });
        }
    }).catch((e) => {
        res.render('error.ejs', { title: 'Error',error: "User Session Expired. Please sign in."});
    })
    /* if(user){
        res.render('Faculty/Profile.ejs', {
            displayName: user.displayName,
             email: user.email, 
             uid: user.uid
        });
    } */
})

module.exports = router;
