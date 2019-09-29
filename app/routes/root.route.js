'use strict'

module.exports = function (req, res) {
	res.render('home', {
		user: req.user
	})
}
