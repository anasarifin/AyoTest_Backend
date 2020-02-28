const express = require('express')
const Route = express.Router()

// import all routes
const admin = require('./routes/admin')

// Routes
Route.use('/admin', admin)

module.exports = Route
