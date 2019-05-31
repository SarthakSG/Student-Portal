var express = require('express');
var router = express.Router();

var mark_attendance_details = require('./MarkAttendanceDetails');
var mark_attendance = require('./MarkAttendance');
var show_attendance_percentage = require('./PercentageAttendanceView');
var attendance_percentage_details = require('./PercentageAttendanceDetails');
var show_daily_attendance = require('./DailyAttendanceView');
var daily_attendance_details = require('./DailyAttendanceDetails');
var attendance_view_options = require('./AttendanceViewOptions');
var attendance_view = require('./AttendanceView');

router.use('/markattendancedetails', mark_attendance_details);
router.use('/markattendance', mark_attendance);
router.use('/showattendancepercentage', show_attendance_percentage);
router.use('/attendancepercentagedetails', attendance_percentage_details);
router.use('/showdailyattendance', show_daily_attendance);
router.use('/dailyattendancedetails', daily_attendance_details);
router.use('/attendanceviewoptions', attendance_view_options);
router.use('/attendanceview', attendance_view);

module.exports = router;