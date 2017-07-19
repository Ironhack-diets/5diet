const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const debug = require('debug')(`DietsApp:${path.basename(__filename).split('.')[0]}`);
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);

mongoose.connect('mongodb://localhost/dietsapp').then(() => debug('DB Conected! =)'));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'tuDIETA';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('layout', 'layout/main');
app.use(layouts);

app.use(flash());
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
app.use(cookieParser());
require('./passport/local');

app.use(passport.initialize());
app.use(passport.session());

//Require routes
const index = require('./routes/index');
const diet = require('./routes/diet');
const recipe = require('./routes/recipe');
const auth = require('./routes/auth');
const user = require('./routes/user');
app.use('/', index);
app.use('/diets', diet);
app.use('/recipes', recipe);
app.use('/auth', auth);
app.use('/user',user);
require('./config/error-handler')(app);

module.exports = app;
