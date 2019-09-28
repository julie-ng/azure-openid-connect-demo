'use strict'
const app = require('./app')
const http = require('http')

if (process.env.NODE_ENV === 'development') {
	require('dotenv').config()
}

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
