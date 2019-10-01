'use strict'

const endpoints = require('./../config/endpoints')

module.exports = function (req, res) {
  req.session.destroy(function (err) {
    req.logOut()
    res.redirect(endpoints.destroySessionUrl)
  })
}