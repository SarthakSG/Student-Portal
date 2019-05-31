var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var firebase = require('firebase');
const functions = require('firebase-functions');


var index = require('./routes/index');
var student = require('./routes/Student/index');
var faculty = require('./routes/Faculty/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'tempLogo.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', index);
app.use('/student',student);
app.use('/faculty',faculty);

//Manually send error
app.use('/error',(req,res)=>{
  res.render('error.ejs',{error:"Server Error! Task Failed " +
  "\n"+"Please Try Again",
      title: "Server Error"});
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    error:'Error Code : '+ (err.status || 500) +' \n Unexpected Error Occurred',
    title:"Error"
  });
});


exports.app = functions.https.onRequest(app);
