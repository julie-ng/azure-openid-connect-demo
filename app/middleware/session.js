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
	saveUninitialized: false,
	retry_strategy: function (options) {
		if (options.error && options.error.code === 'ECONNREFUSED') {
				// End reconnecting on a specific error and flush all commands with
				// a individual error
				return new Error('The server refused the connection')
		}
		if (options.total_retry_time > 1000 * 60 * 60) {
				// End reconnecting after a specific timeout and flush all commands
				// with a individual error
				return new Error('Retry time exhausted')
		}
		if (options.attempt > 10) {
				// End reconnecting with built in error
				return undefined
		}
		// reconnect after
		return Math.min(options.attempt * 100, 3000)
	}
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
