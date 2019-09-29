'use strict'

const connect = require('connect-ensure-login')
const express = require('express')
const passport = require('passport')
const router = express.Router()

const opts = {
	failureRedirect: '/users/login',
	successRedirect: '/users/profile',
	failureFlash: true
}

router.get('/login', (req, res) => {
	res.render('users/login')
})

router.post('/login', passport.authenticate('local', opts))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/profile', connect.ensureLoggedIn(), (req, res) => {
	res.render('users/profile', { user: req.user })
})

module.exports = router