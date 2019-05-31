var database = firebase.database();
var studentList = JSON.parse($('#studentList').text());
console.log(studentList);

var subCode = document.getElementById('subCode').value;
console.log('SubCode:' + subCode);
var LectureNumber = document.getElementById('LectureNumber').value;
var year_branch = document.getElementById('year_branch').value;
var user = firebase.auth().currentUser;
var DateAtt = document.getElementById('DateAtt').value;
console.log('LectureNumber:' + LectureNumber);
console.log('year_branch:' + year_branch);
console.log('DateAtt:' + DateAtt);


var AttendanceChecks = []
var setInitial;
var PercentageAttendanceList = [{}];
var date_today_raw = new Date();
var date_today = date_today_raw.getDate() + "-" + (parseInt(date_today_raw.getMonth()) + 1) + "-" + date_today_raw.getFullYear();

document.getElementById('Submit').addEventListener('click', () => {

    $('#loading_overlay').show();
    document.getElementById('Submit').disabled = true;
    console.log('Marking Att');
    authCheck((user) => {
        {
            console.log('IILM-CET/Attendance/' + subCode + '/DailyAttendance/' + DateAtt + '/' + LectureNumber);

            var DailyAttendanceRef = database.ref('IILM-CET/Attendance/' + subCode + '/DailyAttendance/' + DateAtt + '/' + LectureNumber);
            var AttendancePercentageRef = database.ref('IILM-CET/Attendance/' + subCode + '/AttendancePercentage');

            AttendanceChecksElem = document.getElementsByClassName('Attendance');
            for (let index = 0; index < AttendanceChecksElem.length; index++) {
                const element = AttendanceChecksElem[index];
                if (element.checked) {
                    AttendanceChecks[index] = 1;
                } else AttendanceChecks[index] = 0;
                console.log(element.checked);
                console.log(studentList[index]);


            }

            var TL;


            database.ref('IILM-CET/Subjects/' + year_branch + '/' + subCode).set(subCode);


            console.log('Generating Daily Attendance');

            DailyAttendanceRef.once('value',(snapshot) => {
                if (!snapshot.exists()) {
                    //Generating Daily Attendance
                    if (AttendanceChecks !== null) {
                        DailyAttendanceRef.child('LectureNumber').set(LectureNumber);
                        DailyAttendanceRef.child('MarkedBy').set(user.email);

                        for (var i = 0; i < studentList.length; i++) {
                            var dbVal = {
                                Attendance: AttendanceChecks[i],
                                RollNumber: studentList[i].RollNumber,
                                Name: studentList[i].FirstName + studentList[i].LastName
                            };
                            console.log(dbVal);
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
                                        Attendance: AttendanceChecks[i],
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
                                            mutableSnap.LecturesAttended[rollNo].Attendance += AttendanceChecks[i];
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
                                    alert('Attendance Updated');
                                    window.location = '/faculty/dashboard';

                                    /* if (status.snapshot != null) {
                                        res.render('Faculty/Attendance/PercentageAttendanceView.ejs', {
                                            title: "Mark Attendance", displayName: user.displayName,
                                            PercentageAttendanceList: PercentageAttendanceList,
                                            TotalLectures: TL
                                        });
                                    } */


                                });
                            }
                        })
                    } else { }
                } else{
                                    alert('Attendance already marked for this lecture');
                                    window.location = '/faculty/dashboard';
                }
            })


        }

    })

})
