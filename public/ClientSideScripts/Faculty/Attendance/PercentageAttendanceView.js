var express = require('express');
var router = express.Router();
var firebase = require('firebase-admin');
var database = firebase.database();
var PercentageAttendanceList = [{}];
var percentAtt = [];

router.get('/', (req, res) => {
    var subCode = 'RCS-403';

    var AttendancePercentageRef = database.ref('IILM-CET/Attendance/' + subCode + '/AttendancePercentage');
    var TotalLectures;
    AttendancePercentageRef.child('TotalLectures').once('value', snapshot => {
        TotalLectures = snapshot.val();
    }).then(snapt => {
        AttendancePercentageRef.child('LecturesAttended').once('value', snapshot => {
            if (snapshot) {
                var i = 0;
                snapshot.forEach(childsnapshot => {
                    PercentageAttendanceList[i] = childsnapshot.val();
                    percentAtt[i] = Number(parseFloat(PercentageAttendanceList[i].Attendance / TotalLectures) * 100).toFixed(2);

                    PercentageAttendanceList[i].Attendance = percentAtt[i];

                    i++;
                });
            } else return null;
        }).then(status => {
            res.render('Faculty/Attendance/PercentageAttendanceView.ejs', { title: 'Show Attendance', PercentageAttendanceList: PercentageAttendanceList });
        });
    });
});

module.exports = router;