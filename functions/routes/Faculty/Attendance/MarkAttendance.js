var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var database = firebase.database();


router.post('/', function (req, res, next) {
    console.log('Routing ,,..');
    
    var studentList = [{}];
    var subCode = "";
    var DateAtt = "";
    var AttendanceChecks = [""];
    var setInitial;
    var PercentageAttendanceList = [{}];
    var year_branch;
    var LectureNumber = 0;
    var date_today_raw = new Date();
    var date_today = date_today_raw.getDate() + "-" + (parseInt(date_today_raw.getMonth()) + 1) + "-" + date_today_raw.getFullYear();
    studentList = [{}];
    var DateIn = req.body.Date;
    subCode = req.body.SubjectCodeAlpha.toUpperCase() + "-" + req.body.SubjectCodeNum;
    console.log('SubCode: '+subCode);
    
    var year = req.body.SelectYear;
    var branch = req.body.SelectBranch;
    year_branch = parseInt(parseInt(year) * 10 + parseInt(branch));
    LectureNumber = req.body.SelectLectureNumber;
    var idToken = req.body.t;

    var date;
    if (DateIn == "" || DateIn == null) {
        date = new Date();
    } else {
        date = new Date(DateIn);
    }



    DateAtt = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getFullYear();

    var studentListRef = database.ref('IILM-CET/Users').orderByChild('year_branch').equalTo(year_branch);

    if (year_branch == 0 || subCode.length < 7) {
        res.redirect('/faculty/attendance/markattendancedetails');
    } else {
        
        firebase.auth().verifyIdToken(idToken).then((user) => {
            if (user != null) {
                var userId = user.uid;
                var userInfoRef = firebase.database().ref('IILM-CET/Users/' + userId + '/AccountType');
                userInfoRef.once('value', snapshot => {


                    if (snapshot != null) {

                        if (snapshot.val() == 'Faculty' || snapshot.val() == 'Admin') {

                            if (user.email_verified) {


                                studentListRef.once('value', snapshot => {
                                    if (snapshot) {
                                        var i = 0;
                                        snapshot.forEach(childsnapshot => {
                                            studentList[i] = childsnapshot.val();
                                            i++;
                                        });
                                    } else return null;
                                }).then(status => {

                                    res.render('Faculty/Attendance/MarkAttendance.ejs', {
                                        title: "Mark Attendance", displayName: user.name,
                                        studentList: studentList,
                                        subCode: subCode,
                                        LectureNumber: LectureNumber,
                                        year_branch: year_branch,
                                        DateAtt:DateAtt,

                                    });
                                    removeListener();
                                }).catch((error) => {

                                })


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

        /*  var removeListener = firebase - admin.auth().onAuthStateChanged(function (user) {
            /*  if (user) {
                 studentListRef.once('value', snapshot => {
                     if (snapshot) {
                         var i = 0;
                         snapshot.forEach(childsnapshot => {
                             studentList[i] = childsnapshot.val();
                             i++;
                         });
                     } else return null;
                 }).then(status => {
 
                     res.render('Faculty/Attendance/MarkAttendance.ejs', {
                         title: "Mark Attendance", displayName: user.displayName,
                         studentList: studentList,
                         subCode: subCode,
 
                     });
                     removeListener();
                 }).catch((error) => {
                     console.log("Error : " + error);
 
                 })
 
             }
             else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please Sign In" }); */

        /*  if (user) {
             var uid = user.uid;
             var userInfoRef = firebase-admin.database().ref('IILM-CET/Users/' + uid + '/AccountType');
             userInfoRef.on('value', snapshot => {
                 if (snapshot != null) {
 
                     if (snapshot.val() == 'Faculty') {
                         if (user.emailVerified){ studentListRef.once('value', snapshot => {
                             if (snapshot) {
                                 var i = 0;
                                 snapshot.forEach(childsnapshot => {
                                     studentList[i] = childsnapshot.val();
                                     i++;
                                 });
                             } else return null;
                         }).then(status => {
 
                             res.render('Faculty/Attendance/MarkAttendance.ejs', {
                                 title: "Mark Attendance", displayName: user.displayName,
                                 studentList: studentList
                             });
                             removeListener();
                         });} else res.render('Faculty/Authentication/SignIn.ejs', { error: "Please veify your Email-Id" });
                     } else {
                         res.redirect('/faculty/signin');
                     }
                 }
             });
         } else res.redirect('/faculty/signin'); 
    });
    removeListener(); */
    }
});

/* router.post('/', (req, res, next) => {
    const user = firebase.auth().currentUser;

    if (LectureNumber === 0) {
        res.render('Faculty/Attendance/MarkAttendanceDetails.ejs', { title: "Attendance", displayName: user.displayName, error: "Please select lecture number " });
    } else if (subCode === "") {
        res.render('Faculty/Attendance/MarkAttendanceDetails.ejs', { title: "Attendance", displayName: user.displayName, error: "Please enter a valid subject code " });
    } else if (year_branch === 0) {
        res.render('Faculty/Attendance/MarkAttendanceDetails.ejs', { title: "Attendance", displayName: user.displayName, error: "Please select valid year and branch " });
    } else {

        var DailyAttendanceRef = database.ref('IILM-CET/Attendance/' + subCode + '/DailyAttendance/' + DateAtt + '/' + LectureNumber);
        var AttendancePercentageRef = database.ref('IILM-CET/Attendance/' + subCode + '/AttendancePercentage');

        AttendanceChecks = req.body.Attendance;
        var TL;

        database.ref('IILM-CET/Subjects/' + year_branch + '/' + subCode).set(subCode);



        //Generating Daily Attendance
        if (AttendanceChecks !== null) {
            DailyAttendanceRef.child('LectureNumber').set(LectureNumber);
            DailyAttendanceRef.child('MarkedBy').set(user.email);

            for (var i = 0; i < studentList.length; i++) {
                var dbVal = {
                    Attendance: AttendanceChecks.includes(studentList[i].RollNumber),
                    RollNumber: studentList[i].RollNumber,
                    Name: studentList[i].FirstName + studentList[i].LastName
                };
                DailyAttendanceRef.child('Attendance').child(studentList[i].RollNumber).set(dbVal).then(error => {
                    if (error) console.log(error);
                });
            }
        } else console.log("No Checks");

        //Generating Attendance Percentage
        if (AttendanceChecks) {
            AttendancePercentageRef.once('value', snapshot => {
                setInitial = !(snapshot !== null && snapshot.hasChildren());
                if (setInitial) {
                    for (var i = 0; i < studentList.length; i++) {
                        var LecturesAttendeddbVal = {
                            Attendance: +AttendanceChecks.includes(studentList[i].RollNumber),
                            RollNumber: studentList[i].RollNumber,
                            Name: studentList[i].FirstName + " " + studentList[i].LastName
                        };
                        AttendancePercentageRef.child('LecturesAttended').child(studentList[i].RollNumber).set(LecturesAttendeddbVal).then(error => {
                            if (error) console.log('error : ' + error);
                        });
                    }

                    AttendancePercentageRef.child('TotalLectures').set(1);
                }
            }).then(success => {
                if (success && !setInitial) {
                    AttendancePercentageRef.off();
                    AttendancePercentageRef.transaction(mutableSnap => {
                        if (mutableSnap !== null) {
                            for (var i = 0; i < studentList.length; i++) {
                                var rollNo = studentList[i].RollNumber;
                                mutableSnap.LecturesAttended[rollNo].Attendance += AttendanceChecks.includes(studentList[i].RollNumber);
                            }

                            TL = ++mutableSnap.TotalLectures;

                            for (var i = 0; i < studentList.length; i++) {
                                var percentAtt = [];

                                percentAtt[i] = Number(parseFloat(mutableSnap.LecturesAttended[studentList[i].RollNumber].Attendance / mutableSnap.TotalLectures) * 100).toFixed(2);
                                PercentageAttendanceList[i] = {
                                    Name: studentList[i].FirstName + ' ' + studentList[i].LastName,
                                    Attendance: percentAtt[i],
                                    RollNumber: studentList[i].RollNumber,
                                    lecturesAttended: mutableSnap.LecturesAttended[studentList[i].RollNumber].Attendance

                                };
                            }

                            return mutableSnap;
                        } else return null;
                    }).then(status => {
                        console.log("Status :" + JSON.stringify(status));

                        if (status.snapshot != null) {
                            res.render('Faculty/Attendance/PercentageAttendanceView.ejs', {
                                title: "Mark Attendance", displayName: user.displayName,
                                PercentageAttendanceList: PercentageAttendanceList,
                                TotalLectures: TL
                            });
                        }


                    });
                }
            })
        } else { }
    }
});
 */
router.get('/submitted', (req, res, next) => {

    var AttendancePercentageRef = database.ref('IILM-CET/Attendance/' + subCode + '/AttendancePercentage');
    var TotalLectures;
    AttendancePercentageRef.child('TotalLectures').once('value', snapshot => {
        TotalLectures = snapshot.val();
    }).then(snapt => {
        AttendancePercentageRef.child('LecturesAttended').once('value', snapshot => {
            if (snapshot != null) {
                var i = 0;
                snapshot.forEach(childsnapshot => {
                    PercentageAttendanceList[i] = childsnapshot.val();
                    var percentAtt = PercentageAttendanceList[i].Attendance / TotalLectures;
                    i++;
                });
            }
        });
    });
});

module.exports = router;