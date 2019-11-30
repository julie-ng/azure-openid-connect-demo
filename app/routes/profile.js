'use strict'

module.exports = function (req, res) {
  res.json({
		user: req.user,
		json: req.user._json
	})
}