var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');

//Student Sign Up Route
router.get('/', function (req, res, next) {
    res.render('Student/Authentication/SignUp.ejs', { error: "" });
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.tpassword;
    var cpassword = req.body.password;
    var rollNumber = req.body.rollNumber;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var year = req.body.SelectYear;
    var branch = req.body.SelectBranch;

    var validationError;

    var userInfo = {
        Email: email,
        Password: password,
        ProfilePictureUrl: '',
        RollNumber: rollNumber,
        FirstName: firstName,
        LastName: lastName,
        Year: year,
        Branch: branch,
        year_branch: parseInt(year) * 10 + parseInt(branch),
        AccountType: 'Student'
    };
    
    

    if (email.indexOf('@iilmcet.ac.in') == -1) {
        validationError = "Email address is invalid";
        res.render('Student/Authentication/SignUp.ejs', { error: validationError });
    } else if (password != cpassword) {
        validationError = "Password not correctly confirmed";
        res.render('Student/Authentication/SignUp.ejs', { error: validationError });
    } else {
        var userId = req.body.uid;
        var userInfoDbRef = firebase.database().ref('IILM-CET/Users/' + userId);
        userInfoDbRef.set(userInfo);
        res.redirect('/student/signin');
    }
});

module.exports = router;