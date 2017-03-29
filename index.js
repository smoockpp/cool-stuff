'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const TwitterStrategy = require('passport-twitter');
const GoogleStrategy = require('passport-google');
const FacebookStrategy = require('passport-facebook');

const config = require('./config.js');
funct = require('./functions.js');

const app = express();

/**************************
 *        Passport
 **************************/



/**************************
 *        Express
 **************************/

/* Express configuration goes here */
app.use(logger('combined'));
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({ secret: 'supernova', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    const err = req.session.error;
    const msg = req.session.notice;
    const success = req.session.success;
    
    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err) res.locals.error = err;
    if (msg) res.locals.notice = msg;
    if (success) res.locals.success = success;

    next(); // move next
});


/* Tell express to use Handlebars templates */
const hbs = exphbs.create({
    defaultLayout: 'main',
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/**************************
 *        ROUTES
 **************************/

/* Homepage route */
app.get('/', function(req, res) {
    res.render('home', {user: req.user});
});

/* Signup route */
app.get('/signin', function(req, res) {
    res.render('signin');
});

app.post('/local-reg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

app.get('/logout', function(req, res) {
    const name = req.user.username;
    console.log('LOGGIN OUT' + req.user.username);
    req.logout();
    res.redirect('/');
    req.session.notice = 'You have successfully been logged out ' + name + '!';
});


/**************************
 *        PORT
 **************************/

const port = process.env.PORT || 5000; // Own port or pull from .env file
app.listen(port);
console.log('Listening on ' + port + '!');










