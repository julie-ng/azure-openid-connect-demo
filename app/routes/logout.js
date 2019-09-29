'use strict'

const azureEndpoints = require('./../config/endpoints')

module.exports = function (req, res) {
  req.session.destroy(function (err) {
    req.logOut()
    res.redirect(azureEndpoints.destroySessionUrl)
  })
}