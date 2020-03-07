'use strict'

const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)

const REDIS_HOST = process.env.REDIS_HOST || ''
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || false
const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat'

const clientOpts = {
	host: REDIS_HOST,
	port: REDIS_PORT,
	password: REDIS_PASSWORD,
	tls: {
		servername: REDIS_HOST
	}
}

// See redis client readme for details:
// https://github.com/NodeRedis/node-redis#rediscreateclient
const retryStrategy = function (opts) {
	if (opts.error) {
		console.error(opts.error)
		if (opts.error.code === 'ECONNREFUSED') {
			return new Error('The server refused the connection')
		}
	}

	if (opts.total_retry_time > 1000 * 60 * 60) {
		return new Error('Retry time exhausted')
	}

	if (opts.attempt > 10) {
		return undefined
	}

	return Math.min(opts.attempt * 100, 3000)
}

const options = {
	secret: SESSION_SECRET,
	resave: true,
	saveUninitialized: false,
	retry_strategy: retryStrategy
}

if (REDIS_HOST !== '') {
	options.store = new RedisStore({
		client: redis.createClient(clientOpts)
	})
}

module.exports = session(options)
