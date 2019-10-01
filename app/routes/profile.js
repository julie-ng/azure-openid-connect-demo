'use strict'

module.exports = function (req, res) {
  res.render('profile', {
		user: req.user,
		json: req.user._json
	})
}