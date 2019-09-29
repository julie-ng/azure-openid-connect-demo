'use strict'

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const config = require('./../passport/config')

// some session code here is totally outdated

module.exports = function (req, res, next) {
	if (config.useMongoDBSessionStore) {
		dbSession()
	} else {
		localSession()
	}
}

function dbSession () {
	return session({
    secret: 'secret',
    cookie: {maxAge: config.mongoDBSessionMaxAge * 1000},
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      clear_interval: config.mongoDBSessionMaxAge
    })
  })
}

function localSession () {
	return session({
		secret: 'keyboard cat',
		resave: true,
		saveUninitialized: false
	})
}