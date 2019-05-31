var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var database = firebase.database();

/* GET home page. */
router.post('/', function (req, res, next) {

    var idToken = req.body.t;
    firebase.auth().verifyIdToken(idToken).then((user) => {
        if (user != null) {
            var userId = user.uid;
            console.log(userId);
            var userInfoRef = firebase.database().ref('IILM-CET/Users/' + userId + '/AccountType');
            userInfoRef.once('value', snapshot => {


                if (snapshot != null) {

                    if (snapshot.val() == 'Faculty' || snapshot.val() == 'Admin') {
                        console.log("Rendering");

                        if (user.email_verified) {

                            var view_type = req.body.SelectView;
                            var subCode = req.body.SubjectCodeAlpha.toUpperCase() + "-" + req.body.SubjectCodeNum;

                            if (view_type == 2) {
                                var DailyAttendanceList = [{}];
                                var DateIn = req.body.Date;
                                var date = new Date(DateIn);
                                DateAtt = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getFullYear();
                                var DailyAttendanceRef = database.ref('IILM-CET/Attendance/' + subCode + '/DailyAttendance/' + DateAtt);

                                DailyAttendanceRef.once('value', snapshot => {
                                    var i = 0;
                                    console.log(snapshot);
                                    snapshot.forEach(childsnapshot => {
                                        DailyAttendanceList[i] = [];
                                        DailyAttendanceList[i][0] = childsnapshot.val().LectureNumber;
                                        var j = 1;
                                        childsnapshot.child('Attendance').forEach(snap => {
                                            DailyAttendanceList[i][j] = snap.val();
                                            console.log(DailyAttendanceList[i][j]);
                                            j++;
                                        });

                                        i++;
                                    });
                                }).then(status => {
                                    console.log(DailyAttendanceList);

                                    res.render('Faculty/Attendance/DailyAttendanceView.ejs', { title: 'Show Attendance', DailyAttendanceList: DailyAttendanceList, displayName: user.displayName });
                                });
                            } else if (view_type == 1) {
                                var AttendancePercentageRef = database.ref('IILM-CET/Attendance/' + subCode + '/AttendancePercentage');
                                var TotalLectures;
                                var PercentageAttendanceList = [{}];
                                var percentAtt = [];
                                var lecturesAttended = [];
                                AttendancePercentageRef.child('TotalLectures').once('value', snapshot => {
                                    TotalLectures = snapshot.val();
                                }).then(succcess => {
                                    AttendancePercentageRef.child('LecturesAttended').once('value', snapshot => {
                                        if (snapshot) {
                                            var i = 0;
                                            snapshot.forEach(childsnapshot => {
                                                PercentageAttendanceList[i] = childsnapshot.val();
                                                lecturesAttended[i] = childsnapshot.val();
                                                percentAtt[i] = Number(parseFloat(PercentageAttendanceList[i].Attendance / TotalLectures) * 100).toFixed(2);
                                                PercentageAttendanceList[i].Attendance = percentAtt[i];
                                                PercentageAttendanceList[i].lecturesAttended = childsnapshot.val().Attendance;

                                                i++;
                                            });
                                        } else return null;
                                    }).then(() => {
                                        res.render('Faculty/Attendance/PercentageAttendanceView.ejs', { title: 'Show Attendance', PercentageAttendanceList: PercentageAttendanceList, TotalLectures: TotalLectures, lecturesAttended: lecturesAttended, displayName: user.displayName });
                                    }).catch((error) => {
                                        res.render('Faculty/Authentication/SignIn.ejs', { error: "Please Login as Faculty \nError : " + error.message });
                                    });
                                });
                            }


                        } else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
                    } else {
                        console.log("User doesn't have enough permissions");

                        res.render('error.ejs', { title: 'Error', error: `You don't have enough permissions.` });

                    }
                }
            });
        } else res.redirect('/faculty/signin');
    }).catch((e) => {
        res.render('error.ejs', { title: 'Error', error: "User Session Expired. Please sign in." });
    })

    //const user = firebase.auth().currentUser
    /* const user = firebase.auth().currentUser;
    var removeListener = firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            var view_type = req.body.SelectView;
            var subCode = req.body.SubjectCodeAlpha.toUpperCase() + "-" + req.body.SubjectCodeNum;

            if (view_type == 2) {
                var DailyAttendanceList = [{}];
                var DateIn = req.body.Date;
                var date = new Date(DateIn);
                DateAtt = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getFullYear();
                var DailyAttendanceRef = database.ref('IILM-CET/Attendance/' + subCode + '/DailyAttendance/' + DateAtt);

                DailyAttendanceRef.once('value', snapshot => {
                    var i = 0;
                    console.log(snapshot);
                    snapshot.forEach(childsnapshot => {
                        DailyAttendanceList[i] = [];
                        DailyAttendanceList[i][0] = childsnapshot.val().LectureNumber;
                        var j = 1;
                        childsnapshot.child('Attendance').forEach(snap => {
                            DailyAttendanceList[i][j] = snap.val();
                            console.log(DailyAttendanceList[i][j]);
                            j++;
                        });

                        i++;
                    });
                }).then(status => {
                    console.log(DailyAttendanceList);

                    res.render('Faculty/Attendance/DailyAttendanceView.ejs', { title: 'Show Attendance', DailyAttendanceList: DailyAttendanceList, displayName: user.displayName });
                });
            } else if (view_type == 1) {
                var AttendancePercentageRef = database.ref('IILM-CET/Attendance/' + subCode + '/AttendancePercentage');
                var TotalLectures;
                var PercentageAttendanceList = [{}];
                var percentAtt = [];
                var lecturesAttended = [];
                AttendancePercentageRef.child('TotalLectures').once('value', snapshot => {
                    TotalLectures = snapshot.val();
                }).then(succcess => {
                    AttendancePercentageRef.child('LecturesAttended').once('value', snapshot => {
                        if (snapshot) {
                            var i = 0;
                            snapshot.forEach(childsnapshot => {
                                PercentageAttendanceList[i] = childsnapshot.val();
                                lecturesAttended[i] = childsnapshot.val();
                                percentAtt[i] = Number(parseFloat(PercentageAttendanceList[i].Attendance / TotalLectures) * 100).toFixed(2);
                                PercentageAttendanceList[i].Attendance = percentAtt[i];
                                PercentageAttendanceList[i].lecturesAttended = childsnapshot.val().Attendance;

                                i++;
                            });
                        } else return null;
                    }).then(() => {
                        res.render('Faculty/Attendance/PercentageAttendanceView.ejs', { title: 'Show Attendance', PercentageAttendanceList: PercentageAttendanceList, TotalLectures: TotalLectures, lecturesAttended: lecturesAttended, displayName: user.displayName });
                    }).catch((error) => {
                        res.render('Faculty/Authentication/SignIn.ejs', { error: "Please Login as Faculty \nError : " + error.message });
                    });
                });
            }
        } else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please Login as Faculty" });

        /*  if (user) {
             var uid = user.uid;
             var userInfoRef = firebase.database().ref('IILM-CET/Users/' + uid + '/AccountType');
             userInfoRef.once('value', snapshot => {
                 if (snapshot != null) {
                     if (snapshot.val() == 'Faculty') {
                         if (user.emailVerified) {
                             var view_type = req.body.SelectView;
                             var subCode = req.body.SubjectCodeAlpha.toUpperCase() + "-" + req.body.SubjectCodeNum;
    
                             if (view_type == 2) {
                                 var DailyAttendanceList = [{}];
                                 var DateIn = req.body.Date;
                                 var date = new Date(DateIn);
                                 DateAtt = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getFullYear();
                                 var DailyAttendanceRef = database.ref('IILM-CET/Attendance/' + subCode + '/DailyAttendance/' + DateAtt);
    
                                 DailyAttendanceRef.once('value', snapshot => {
                                     var i = 0;
                                     console.log(snapshot);
                                     snapshot.forEach(childsnapshot => {
                                         DailyAttendanceList[i] = [];
                                         DailyAttendanceList[i][0] = childsnapshot.val().LectureNumber;
                                         var j = 1;
                                         childsnapshot.child('Attendance').forEach(snap => {
                                             DailyAttendanceList[i][j] = snap.val();
                                             console.log(DailyAttendanceList[i][j]);
                                             j++;
                                         });
    
                                         i++;
                                     });
                                 }).then(status => {
                                     console.log(DailyAttendanceList);
    
                                     res.render('Faculty/Attendance/DailyAttendanceView.ejs', { title: 'Show Attendance', DailyAttendanceList: DailyAttendanceList, displayName: user.displayName });
                                 });
                             } else if (view_type == 1) {
                                 var AttendancePercentageRef = database.ref('IILM-CET/Attendance/' + subCode + '/AttendancePercentage');
                                 var TotalLectures;
                                 var PercentageAttendanceList = [{}];
                                 var percentAtt = [];
                                 var lecturesAttended = [];
                                 AttendancePercentageRef.child('TotalLectures').once('value', snapshot => {
                                     TotalLectures = snapshot.val();
                                 }).then(succcess => {
                                     AttendancePercentageRef.child('LecturesAttended').once('value', snapshot => {
                                         if (snapshot) {
                                             var i = 0;
                                             snapshot.forEach(childsnapshot => {
                                                 PercentageAttendanceList[i] = childsnapshot.val();
                                                 lecturesAttended[i] = childsnapshot.val();
                                                 percentAtt[i] = Number(parseFloat(PercentageAttendanceList[i].Attendance / TotalLectures) * 100).toFixed(2);
                                                 PercentageAttendanceList[i].Attendance = percentAtt[i];
                                                 PercentageAttendanceList[i].lecturesAttended = childsnapshot.val().Attendance;
    
                                                 i++;
                                             });
                                         } else return null;
                                     }).then(() => {
                                         res.render('Faculty/Attendance/PercentageAttendanceView.ejs', { title: 'Show Attendance', PercentageAttendanceList: PercentageAttendanceList, TotalLectures: TotalLectures, lecturesAttended: lecturesAttended, displayName: user.displayName });
                                     });
                                 });
                             }
                         } else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
                     } else {
                         res.redirect('/faculty/signin');
                     }
                 }
             });
         } else res.redirect('/faculty/signin'); 
    });
    removeListener(); */
});

module.exports = router;