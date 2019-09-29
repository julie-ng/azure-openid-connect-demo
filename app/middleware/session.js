'use strict'

const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)

const REDIS_HOST = process.env.REDIS_HOST || ''
const REDIS_PORT = process.env.REDIS_PORT || 6379
const SESSION_SECRET = process.env.SESSION_SECRET || 'keyboard cat'

const options = {
	secret: SESSION_SECRET,
	resave: true,
	saveUninitialized: false
}

// let options = Object.assign({}, defaults)

if (REDIS_HOST !== '') {
	const client = redis.createClient({
		host: REDIS_HOST,
		port: REDIS_PORT
	})
	options.store = new RedisStore({ client: client })

	// Object.assign(defaults, {
	// 	store: new RedisStore({ client: client })
	// })
}

module.exports = options

	// console.log('*********** options');
	// console.log(options);






// module.exports = function (req, res, next) {
// 	let options = Object.assign({}, defaults)

// 	if (REDIS_HOST !== '') {
// 		const client = redis.createClient({
// 			host: REDIS_HOST,
// 			port: REDIS_PORT
// 		})
// 		options.store = new RedisStore({ client })
// 	}

// 	console.log('*********** options');
// 	console.log(options);



// 	return session(options)
// 	// next()
// }
