'use strict'

// eslint-disable-next-line no-unused-vars
const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const monitor = require('./middleware/monitor')
const forceHttps = require('./middleware/force-https')

let app = express()

// --- Middleware ---

app.use(forceHttps)
app.use(helmet())
app.use(logger('dev'))
app.use(monitor)

// --- Routes ---

app.get('/', (req, res) => {
	res.send('OK')
})

app.get('/health', (req, res) => {
	let body = {
		status: 'pass',
		version: '1',
		description: 'A Node.js App',
		details: {
			uptime: {
				componentType: 'system',
				observedValue: process.uptime(),
				observedUnit: 's',
				status: 'pass',
				time: new Date()
			}
		}
	}
	res.json(body)
})

app.use((req, res, next) => {
  res.status(404).send('Oops - page not found.')
})

module.exports = app