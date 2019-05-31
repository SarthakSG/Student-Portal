var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var database = firebase.database();
var auth = firebase.auth();
var subjectsList = [''];
var lecturesAttended = [];
var totalLectures = [];
var attendancePercentage = [];

router.get('/', (req, res) => {

    res.render('Student/PercentageAttendanceView.ejs', {
        title: 'Attendance'});

   /*  var user = auth.currentUser;
    var rollNumber;
    var year_branch;
    var uid = user.uid;
    database.ref('IILM-CET/Users/' + uid).once('value', snapshot => {
        rollNumber = snapshot.val().RollNumber;
        year_branch = snapshot.val().year_branch;
        return snapshot;
    }).then(status => {
        database.ref('IILM-CET/Subjects/' + year_branch).once('value').then(snapshot => {
            var i = 0;
            var x = 0;

            var renderView = () => {
                console.log('Before render');

                res.render('Student/PercentageAttendanceView.ejs', {
                    title: 'Attendance',
                    subjectList: subjectsList,
                    lecturesAttended: lecturesAttended,
                    totalLectures: totalLectures,
                    attendancePercentage: attendancePercentage,
                    displayName: user.displayName
                });
            };

            snapshot.forEach(subjects => {
                subjectsList[x] = subjects.val();
                x++;
            });

            var get_attendance = i => {
                database.ref('IILM-CET/Attendance/' + subjectsList[i] + '/AttendancePercentage').once('value', snap => {
                    if (snap!=null) {
                        snapVal = snap.val();
                        lecturesAttended[i] = snapVal.LecturesAttended[rollNumber].Attendance;
                        totalLectures[i] = snapVal.TotalLectures;
                        attendancePercentage[i] = Number(parseFloat(lecturesAttended[i] / totalLectures[i]) * 100).toFixed(2);

                        i++;
                        if (i < subjectsList.length) {
                            get_attendance(i);
                        } else {

                            renderView();
                        }
                    } else return;
                });
            };

            get_attendance(0);
        });
    }); */
});

module.exports = router;