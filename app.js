require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./helpers/utils"); // utils for hbs templates

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");
const keys = require('./config/keys');
const flash = require('connect-flash')
const cookieSession = require("cookie-session");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(flash())
hbs.registerPartials(__dirname + "/views/partials");




// Init google passport config
require('./config/passport')();
const passport = require('passport')




//Routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Cookie setup for passport
// -------------------------------------------
app.use(cookieSession({
  // milliseconds of a day
  maxAge: 24*60*60*1000,
  keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
// -------------------------------------------


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth/", require('./routes/auth'))



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
