var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var connection = require('./routes/db');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login')
var usersRouter = require('./routes/users');
var reservRouter = require('./routes/reservation');
var registerRouter = require('./routes/register');
var complainRouter = require('./routes/complain');
var logoutRouter = require('./routes/logout');
var helpRouter = require('./routes/help');
var faqRouter = require('./routes/faq');
var reviewRouter = require('./routes/review');
var bookingRouter = require('./routes/booking');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // 쿠키쿠키쿠키이용
app.use(express.static(path.join(__dirname, 'public')));

app.use('/logout', logoutRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/reservation',reservRouter);
app.use('/register',registerRouter);
app.use('/complain',complainRouter);
app.use('/help', helpRouter);
app.use('/faq', faqRouter);
app.use('/review',reviewRouter);
app.use('/booking',bookingRouter);


app.get("https://script.google.com/macros/s/AKfycbxj63IPDhClUPJzBPqiAuiVmARgMF1dtSir2xo-qg/exec",function(req,res){
  backURL=req.header('Referer') || '/';
  res.redirect(backURL);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
