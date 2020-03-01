const express = require('express')
const Route = express.Router()

// import all routes
const users = require('./routes/users')
// const score_user = require('./routes/score_user')
const assessment_name = require("./routes/assessment_name");
// Routes
Route.use('/users', users)
// Route.use('/score', score_user)
Route.use("/assessment", assessment_name);
module.exports = Route