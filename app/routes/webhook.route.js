'use strict'

module.exports = (req, res) => {
	let payload = {
		status:  'OK',
		payload: {
			headers: req.headers,
			body: req.body
		}
	}
	console.log(payload)
	res.send(JSON.stringify(payload))
}