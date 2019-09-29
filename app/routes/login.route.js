'use strict'

// More about state param, see:
// https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/
function state () {
	return 'my_state'
}

function authenticate (req, res, next) {
	const opts = {
		response: res,
		customState: state(),
		failureRedirect: '/'
	}
	return passport.authenticate('azuread-openidconnect', opts)(req, res, next)
}

function onSuccess (req, res) {
	console.log('Successfully authenticated against Azure AD')
	res.redirect('/')
}

module.exports = [authenticate, onSuccess]
