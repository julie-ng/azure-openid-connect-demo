'use strict'

module.exports = {
	root: require('./root.route'),
	profile: require('./profile.route'),
	login: require('./login.route'),
	logout: require('./logout.route'),
	openIDReturn: require('./openid-return.route'),
	home: require('./home.route'),
	healthcheck: require('./healthcheck.route'),
}