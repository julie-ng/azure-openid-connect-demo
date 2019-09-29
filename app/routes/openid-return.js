'use strict'

const passport = require('passport')

function cb (req, res, next) {
	const opts = {
		response: res,
		failureRedirect: '/'
	}
	return passport.authenticate('azuread-openidconnect', opts)(req, res, next)
}

function onSuccess (req, res) {
	console.log('Received return from Azure AD')
	res.redirect('/')
}

module.exports = [cb, onSuccess]