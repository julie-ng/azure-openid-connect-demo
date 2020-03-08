'use strict'

/**
 * Loads pre-defined environment variables in `.env`.
 * See `.env.sample` as a template
 */
if (process.env.NODE_ENV === 'development') {
	require('dotenv').config()
}

const APP_INSIGHTS_INSTRUMENTATION_KEY = (process.env.APP_INSIGHTS_INSTRUMENTATION_KEY)
	? process.env.APP_INSIGHTS_INSTRUMENTATION_KEY
	: false

if (APP_INSIGHTS_INSTRUMENTATION_KEY) {
	const appInsights = require('applicationinsights')
	appInsights
		.setup(process.env.APP_INSIGHTS_INSTRUMENTATION_KEY)
		.start()
}

const port = process.env.PORT || 3000
const http = require('http')
const app = require('./app')
const server = http.createServer(app)

server.listen(port, () => {
	console.log('')
	console.log(`Listening on port ${port}`)
})
