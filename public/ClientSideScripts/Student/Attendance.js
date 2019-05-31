var database = firebase.database();
var auth = firebase.auth();
var subjectsList = [];
var lecturesAttended = [];
var totalLectures = [];
var attendancePercentage = [];

authCheck((user) => {
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

            if (!snapshot.exists()) {
                document.querySelector('.card-header').innerHTML = 'No Attendance Found'
            }

            snapshot.forEach(subjects => {
                subjectsList[x] = subjects.val();
                x++;
            });
            var renderView = () => {
                console.log('Before render');

                document.getElementById('accordion').innerHTML = '';
                for (i = 0; i < subjectsList.length; i++) {
                    console.log(subjectsList[i]);

                    document.getElementById('accordion').insertAdjacentHTML('beforeend', `
                    <div class="card " style="font-size: 18px">
                    <div class="card-header" id="`+ subjectsList[i] + `">
                            <a class="btn btn-link collapsed" style="font-size: 19px !important;" data-toggle="collapse" data-target="#`+ subjectsList[i] + `cont" aria-expanded="false" aria-controls="` + subjectsList[i] + `cont">
                               `+ subjectsList[i] + `
                            </a>
                    </div>
                    <div id="`+ subjectsList[i] + `cont" class="collapse" aria-labelledby="` + subjectsList[i] + `"
                         data-parent="#accordion">
                        <div class="card-body ml-1">
                            Lectures Attended = `+ lecturesAttended[i] + `<br>
                            Total Lectures = `+ totalLectures[i] + `<br>
                            Percentage Attendance =`+ attendancePercentage[i] + `%<br>
                        </div>
                    </div>
            
                </div>
                    `)
                }

            };
            var get_attendance = i => {
                database.ref('IILM-CET/Attendance/' + subjectsList[i] + '/AttendancePercentage').once('value', snap => {
                    if (snap != null) {
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
    });
})




