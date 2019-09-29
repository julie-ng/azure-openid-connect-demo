'use strict'

// eslint-disable-next-line no-unused-vars
const hbs  = require('express-handlebars')
const express = require('express')
// const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const logger = require('morgan')
const passport = require('passport')
const path = require('path')
const methodOverride = require('method-override')

// // const config = require('./passport/config') // temp
const app = express()


// Middleware
// ----------------------------

// const monitor = require('./middleware/monitor')
// const forceHttps = require('./middleware/force-https')

// const session = require('express-session')
// const redis = require('redis')

// const RedisStore = require('connect-redis')(session)
// const redisClient = redis.createClient()
// const sessionOpts = {
//   store: new RedisStore({ client: redisClient }),
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false
// }



// app.use(forceHttps)
app.use(helmet())
app.use(logger('dev'))
app.use(methodOverride())
app.use(cookieParser())

// const sessionOpts = require('./middleware/session')
// app.use(session(sessionOpts))
app.use(require('./middleware/session'))

// app.use(session(sessionOpts))
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: false
// }))
// app.use(monitor)
app.use(bodyParser.urlencoded({ extended : true }))


// Setup Passport.js
// ----------------------------

require('./passport/strategy').setup()
app.use(passport.initialize())
app.use(passport.session())


// Web HTML & CSS
// ----------------------------

app.use('/assets/', express.static(path.join(__dirname,'/assets')))
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