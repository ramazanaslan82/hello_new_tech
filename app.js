var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require("i18n");

var routes = require('./routes/index');
var users = require('./routes/users');

// Database
var dbConnection = null;
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
  if (!err) {
    console.log("We are connected");
  }
  dbConnection = db;
});


i18n.configure({
  // setup some locales - other locales default to en silently
  locales:['tr', 'en'],

  // fall back from Dutch to German
  fallbacks:{'nl': 'tr'},

  // you may alter a site wide default locale
  defaultLocale: 'tr',

  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  cookie: 'localcookie',

  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',

  // whether to write new locale information to disk - defaults to true
  updateFiles: true,

  // what to use as the indentation unit - defaults to "\t"
  indent: "\t",

  // setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
  extension: '.json',

  // setting prefix of json files name - default to none '' (in case you use different locale files naming scheme (webapp-en.json), rather then just en.json)
  prefix: '',

  // enable object notation
  objectNotation: false,

  // setting of log level DEBUG - default to require('debug')('i18n:debug')
  logDebugFn: function (msg) {
    console.log('debug', msg);
  },

  // setting of log level WARN - default to require('debug')('i18n:warn')
  logWarnFn: function (msg) {
    console.log('warn', msg);
  },

  // setting of log level ERROR - default to require('debug')('i18n:error')
  logErrorFn: function (msg) {
    console.log('error', msg);
  }
});


var app = express();

// default: using 'accept-language' header to guess language settings
app.use(i18n.init);

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = dbConnection;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
