require('dotenv').config();
require('./config/mongodb'); // database initial setup
require('./helpers/utils'); // utils for hbs templates
// require("./bin/seed");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
//const cookieSession = require("cookie-session");
const app = express();
const User = require('./models/User')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
hbs.registerPartials(__dirname + '/views/partials');

// Session setup
// -------------------------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    //cookie: {maxAge: 600000,},
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// Init passports config
require('./config/passports/passport')();
require('./config/passports/passportGoogle')();
require('./config/passports/passportSlack')();

app.use(passport.initialize());
app.use(passport.session());

//Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin/restaurants');

app.use(async (req, res, next) => {
  if (req.session.currentUser) {
    const user = await User.findById(req.session.currentUser._id);
    res.locals.currentUser = user;
    res.locals.isLoggedIn = true;
    next();
  } else {
    res.locals.currenUser = undefined;
    res.locals.isLoggedIn = false;
    next();
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth/', require('./routes/auth'));
app.use('/admin', require('./routes/admin/restaurants'));
app.use('/users', require('./routes/ajax/userInfos'))
app.use('/auth/ajax', require('./routes/ajax/ajaxAuth'));
app.use('/', require('./routes/ajax/persoOnCard'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
