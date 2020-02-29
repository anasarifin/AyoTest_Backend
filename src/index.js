const express = require('express')
const Route = express.Router()

// import all routes
const users = require('./routes/users')

// Routes
Route.use('/users', users)

module.exports = Route