'use strict'

module.exports = {
	home: require('./home.route'),
	healthcheck: require('./healthcheck.route'),
	webhook: require('./webhook.route'),
	users: require('./users.route')
}