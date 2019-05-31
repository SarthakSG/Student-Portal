var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

var capsString = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('Faculty/Authentication/SignUp.ejs', { error: "" });
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.tpassword;
    var cpassword = req.body.password;
    var rollNumber = req.body.rollNumber;
    var firstName = capsString(req.body.firstName);
    var lastName = capsString(req.body.lastName);
    var facultyId = req.body.facultyId;
    var verificationKey = req.body.verificationKey;
    var validationError;

    var userInfo = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        FacultyId: facultyId,
        AccountType: 'Faculty'
    };
    var temp = JSON.stringify(req.body);
    console.log(temp);


    if (/* email.indexOf('@iilmcet.ac.in') == -1 */ false) {
        validationError = "Email address is invalid";
        res.render('Faculty/Authentication/SignUp.ejs', { error: validationError });
    } else if (password != cpassword) {
        validationError = "Password not correctly confirmed";
        res.render('Faculty/Authentication/SignUp.ejs', { error: validationError });
    } else if (verificationKey != '7648329123538452580473fienheihsfjregigmebrfc^$%$$%$hdsfjsdfjdjgvbjhvbjvvfiRandomKey&&%$$%@#%&cbcvsAdmin^E#VHDH') {
        validationError = "Verification key is incorrect";
        res.render('Faculty/Authentication/SignUp.ejs', { error: validationError });
    } else {
        var userId = req.body.uid;
        var userInfoDbRef = firebase.database().ref('IILM-CET/Users/' + userId);
        userInfoDbRef.set(userInfo);
        res.redirect('/faculty/signin');

    }
});

module.exports = router;