'use strict'

// eslint-disable-next-line no-unused-vars
const hbs  = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const logger = require('morgan')
const passport = require('passport')
const path = require('path')
const methodOverride = require('method-override')
const sassMiddleware = require('node-sass-middleware')

const app = express()

// Middleware
// ----------------------------

// app.use(forceHttps)
app.use(helmet())
app.use(logger('dev'))
app.use(methodOverride())
app.use(cookieParser())
app.use(require('./middleware/session'))
// app.use(monitor)
app.use(bodyParser.urlencoded({ extended : true }))


// Setup Passport.js
// ----------------------------

require('./config/strategy').setup()
app.use(passport.initialize())
app.use(passport.session())


// Web HTML & CSS
// ----------------------------

app.use(sassMiddleware({
  src: path.join(__dirname, '/scss'),
  dest: path.join(__dirname, '/public'),
  debug: true,
  outputStyle: 'compressed',
  prefix:  '/public'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'hbs')
app.set('view options', { layout: 'layout' })


// Routes
// ----------------------------

const router = require('./routes')
const isProtected = require('./middleware/is-protected')

app.get('/', router.root)
app.get('/login', router.login)
app.get('/logout', router.logout)
app.get('/auth/openid/return', router.openIDReturn)
app.post('/auth/openid/return', router.openIDReturn)
app.get('/profile', isProtected, router.profile)

// 404 page
app.use((req, res, next) => {
  res.status(404).send('Oops - page not found.')
})

module.exports = app