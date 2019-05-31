var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

router.get('/', function (req, res, next) {
    res.render('Faculty/DocumentUpload.ejs');
    /* const user = firebase.auth().currentUser;
    if (user) {
        if (user.emailVerified) res.render('Faculty/DocumentUpload.ejs', { title: 'Document Upload', displayName: user.displayName });
    } else res.redirect('/faculty/signin'); */
});

router.post('/',(req,res,next)=>{
    
    var payload = JSON.parse(req.body);
    var ref = (payload.ref);
    console.log("payload : "+JSON.stringify(payload.data));

    firebase.database().ref(ref).push(payload.data);

    console.log("ref : "+JSON.stringify(payload.ref));
    console.log("token : "+JSON.stringify(firebase.auth().currentUser));
    console.log("Uploaded.. 32");
    


});

module.exports = router;