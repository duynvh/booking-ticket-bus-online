var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Route
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/group');
var sliderRouter = require('./routes/slider');
var provinceRouter = require('./routes/province');
var categoryScheduleRouter = require('./routes/category_schedule');
var categoryArticleRouter = require('./routes/category_article');
var articleRouter = require('./routes/article');
var commentRouter = require('./routes/comment');
var contactRouter = require('./routes/contact');
var routeDepartureRouter = require('./routes/route_departure');
var scheduleRouter = require('./routes/schedule');
var scheduleDetailRouter = require('./routes/schedule_detail');
var transhipmentOfficeRouter = require('./routes/transhipment_office');
var menuRouter = require('./routes/menu');
var orderRouter = require('./routes/order');
// Config constants
var constants = require('./configs/constants');

var app = express();
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
  next();
};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/group', groupRouter);
app.use('/slider', sliderRouter);
app.use('/province', provinceRouter);
app.use('/category-schedule', categoryScheduleRouter);
app.use('/category-article', categoryArticleRouter);
app.use('/article', articleRouter);
app.use('/comment', commentRouter);
app.use('/contact', contactRouter);
app.use('/route-departure', routeDepartureRouter);
app.use('/schedule-detail', scheduleDetailRouter);
app.use('/schedule', scheduleRouter);
app.use('/transhipment-office', transhipmentOfficeRouter);
app.use('/menu', menuRouter);
app.use('/order', orderRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect(constants.db, (err) => {
    if (err) {
        console.log('not connect to the database');
    } else {
        console.log('Suucessfully connected to MongoDB')
    }
})

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
