var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var signIn = require('./Authentication/SignIn');
var dashboard = require('./Dashboard');
var signup = require('./Authentication/SignUp');
var logout = require('./Authentication/LogOut');
var attendance = require('./Attendance');
var profile = require('./Profile');
var feedback = require('./Feedback');

/* Student Routes */
router.use('/signin', signIn);
router.use('/dashboard', dashboard);
router.use('/signup', signup);
router.use('/logout', logout);
router.use('/profile', profile);
router.use('/feedback', feedback);
router.use('/attendance', attendance);

module.exports = router;