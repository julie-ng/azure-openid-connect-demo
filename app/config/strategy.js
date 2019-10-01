'use strict'

const passport = require('passport')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const oidcConfig = require('./oidc')

// console.log(oidcConfig)


// array to hold logged in users
const users = []

function findByOid (oid, fn) {
	for (let i = 0, len = users.length; i < len; i++) {
		let user = users[i]
		console.log('we are using user: ', user)
		if (user.oid === oid) {
			return fn(null, user)
		}
	}
	return fn(null, null)
}

// function verify (iss, sub, profile, accessToken, refreshToken, done) {
function verify (iss, sub, profile, jwtClaims, access_token, refresh_token, params, done) {
	console.log('jwtClaims', jwtClaims)


	if (!profile.oid) {
		return done(new Error("No oid found"), null);
	}
	// asynchronous verification, for effect...
	process.nextTick(function () {
		findByOid(profile.oid, function(err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				// "Auto-registration"
				users.push(profile);
				return done(null, profile);
			}
			return done(null, user);
		});
	});
}

function setup () {
	passport.serializeUser(function (user, done) {
		done(null, user.oid)
	})

	passport.deserializeUser(function (oid, done) {
		findByOid(oid, function (err, user) {
			done(err, user)
		})
	})

	passport.use(new OIDCStrategy(oidcConfig, verify));
}

exports.setup = setup