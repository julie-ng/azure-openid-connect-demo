'use strict'

/**
 * Loads pre-defined environment variables in `.env`.
 * See `.env.sample` as a template
 */
if (process.env.NODE_ENV === 'development') {
	require('dotenv').config()
}

const port = process.env.PORT || 3000
const http = require('http')
const app = require('./app')
const server = http.createServer(app)

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
