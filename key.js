const crypto = require('crypto-random-string')

function pair () {
	console.log('key: ' + crypto({ length: 32 }))
	console.log('iv: ' + crypto({ length: 12 }))
	console.log('')
}

pair()
pair()