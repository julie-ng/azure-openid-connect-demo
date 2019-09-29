'use strict'

const config = require('./../passport/config')

module.exports = function (req, res) {
  req.session.destroy(function (err) {
    req.logOut()
    res.redirect(config.destroySessionUrl)
  })
}