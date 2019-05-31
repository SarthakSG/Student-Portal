var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var signIn = require('./Authentication/SignIn');
var dashboard = require('./Dashboard');
var signup = require('./Authentication/SignUp');
var logout = require('./Authentication/LogOut');
var attendance = require('./Attendance/index');
var rate = require('./Feedback');
var sendToken = require('./FCM/sendToken');
var sendNotification = require('./FCM/sendNotification');
var profile = require('./Profile')

router.use('/signin', signIn);
router.use('/dashboard', dashboard);
router.use('/signup', signup);
router.use('/logout', logout);
router.use('/attendance', attendance);
router.use('/rate', rate);
router.use('/fcm/sendToken',sendToken);
router.use('/fcm/sendNotification',sendNotification);
router.use('/profile',profile);

module.exports = router;