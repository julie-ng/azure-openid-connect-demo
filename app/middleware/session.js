'use strict'

const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)

const REDIS_HOST = process.env.REDIS_HOST || ''
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || false
const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat'

const options = {
	secret: SESSION_SECRET,
	resave: true,
	saveUninitialized: false
}

const serverOpts = {
	host: REDIS_HOST,
	port: REDIS_PORT
}

if (REDIS_PASSWORD) {
	Object.assign(serverOpts, { password: REDIS_PASSWORD })
}

if (REDIS_HOST !== '') {
	const client = redis.createClient(serverOpts)
	options.store = new RedisStore({ client: client })
}

module.exports = session(options)
