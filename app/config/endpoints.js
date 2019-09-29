'use strict'

const TENANT_ID = process.env.TENANT_ID || 'organizations'

const LOGOUT_REDIRECT_URI = process.env.LOGOUT_REDIRECT_URI || ''
const LOGIN_REDIRECT_URI = process.env.LOGIN_REDIRECT_URI || ''

const endpoints = {
	identityMetadata: `https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration`,

	// Required, the reply URL registered in AAD for your app
	redirectUrl: LOGIN_REDIRECT_URI,

	// The url you need to go to destroy the session with AAD
	destroySessionUrl: `https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=${LOGOUT_REDIRECT_URI}`,

	// for Logins
	failureRedirect: '/',
	successRedirect: '/',
}

module.exports = endpoints