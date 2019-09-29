'use strict'

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const config = require('./../passport/config')

module.exports = function (req, res, next) {
	config.useMongoDBSessionStore
		? dbSession()
		: localSession()
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