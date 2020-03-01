const express = require('express')
const Route = express.Router()

// import all routes
const admin = require('./routes/admin')
const score = require('./routes/score')
const users = require('./routes/users')

// Routes
Route.use('/admin', admin)
Route.use('/score', score)
Route.use('/users', users)

module.exports = Route
