'use strict'

const passport = require('passport')
const endpoints = require('./../config/endpoints')

function cb (req, res, next) {
	const opts = {
		response: res,
		failureRedirect: endpoints.failureRedirect
	}
	return passport.authenticate('azuread-openidconnect', opts)(req, res, next)
}

function onSuccess (req, res) {
	console.log('Received return from Azure AD')
	res.redirect(endpoints.successRedirect)
}

module.exports = [cb, onSuccess]