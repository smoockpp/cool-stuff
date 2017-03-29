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

// const config = require('./config.js');
// funct = require('./functions.js');

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
    let err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;
    
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



/**************************
 *        PORT
 **************************/

const port = process.env.PORT || 5000; // Own port or pull from .env file
app.listen(port);
console.log('Listening on ' + port + '!');










