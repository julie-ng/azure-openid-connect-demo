const crypto = require('crypto-random-string')

function pair () {
	console.log('key: ' + crypto(32))
	console.log('iv: ' + crypto(12))
	console.log('')
}

pair()
pair()