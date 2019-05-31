var express = require('express');
var router = express.Router();
var database = require('firebase-admin').database();

router.get('/', (req, res) => {
    var DailyAttendanceList = [];
    /*var DateIn = req.query.Date;
    var subCode = req.query.SubjectCodeAlpha.toUpperCase() + "-" + req.query.SubjectCodeNum;*/
    var subCode = '';
    var DateAtt = '18-2-2018';
    var DailyAttendanceRef = database.ref('IILM-CET/Attendance/' + subCode + '/DailyAttendance/' + DateAtt);

    DailyAttendanceRef.once('value', snapshot => {
        var i = 0;
        snapshot.forEach(childsnapshot => {
            DailyAttendanceList[i] = childsnapshot.val();
            i++;
        });
    }).then(status => {
        res.render('Faculty/Attendance/DailyAttendanceView.ejs', { title: 'Show Attendance', DailyAttendanceList: DailyAttendanceList });
    });
});

module.exports = router;