'use strict'

// eslint-disable-next-line no-unused-vars
const hbs  = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const logger = require('morgan')
const path = require('path')
const methodOverride = require('method-override')
const util = require('util')
const bunyan = require('bunyan')

// set up database for express session
// var MongoStore = require('connect-mongo')(expressSession)
// var mongoose = require('mongoose')

// temp
const config = require('./passport/config')

const log = bunyan.createLogger({
	name: 'Microsoft OIDC Example Web Application'
})


const passport = require('passport')



let app = express()


const strategy = require('./passport/strategy')
// console.log(strategy)

strategy.setup()



// --- Middleware ---

// const monitor = require('./middleware/monitor')
// const forceHttps = require('./middleware/force-https')

// app.use(forceHttps)
app.use(helmet())
app.use(logger('dev'))
// app.use(express.logger())
app.use(methodOverride())
app.use(cookieParser())
// app.use(monitor)



// set up session middleware
// if (config.useMongoDBSessionStore) {
//   mongoose.connect(config.databaseUri);
//   app.use(express.session({
//     secret: 'secret',
//     cookie: {maxAge: config.mongoDBSessionMaxAge * 1000},
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//       clear_interval: config.mongoDBSessionMaxAge
//     })
//   }));
// } else {
  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
// }

app.use(bodyParser.urlencoded({ extended : true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
app.use(express.static(path.join(__dirname,'/assets')))

// --- Views ---

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
app.set('view options', { layout: 'layout' })

// --- Routes ---


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};




// const router = require('./routes')
// app.get('/', router.home)
// app.get('/health', router.healthcheck)
// app.post('/webhooks/test', router.webhook)
// app.use('/users', router.users)


app.get('/', function(req, res) {
  res.render('home', { user: req.user });
});

// '/account' is only available to logged in user
app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', { user: req.user });
});

app.get('/login',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        resourceURL: config.resourceURL,    // optional. Provide a value if you want to specify the resource.
        customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  function(req, res) {
    log.info('Login was called in the Sample');
    res.redirect('/');
});

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.get('/auth/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  function(req, res) {
    log.info('We received a return from AzureAD.');
    res.redirect('/');
  });

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.post('/auth/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect',
      {
        response: res,                      // required
        failureRedirect: '/'
      }
    )(req, res, next);
  },
  function(req, res) {
    log.info('We received a return from AzureAD.');
    res.redirect('/');
  });

// 'logout' route, logout from passport, and destroy the session with AAD.
app.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

app.use((req, res, next) => {
  res.status(404).send('Oops - page not found.')
})

module.exports = app