const express = require("express");
const Route = express.Router();

// import all routes

// Routes

const admin = require("./routes/admin");
const users = require('./routes/users')
const score = require('./routes/score')
const question = require("./routes/question");
const assessment_name = require("./routes/assessment_name");
const otp = require("./routes/otp");


// Routes
Route.use('/admin', admin)
Route.use('/score', score)
Route.use('/users', users)
Route.use("/question", question);
Route.use("/assessment", assessment_name);
Route.use("/otp", otp);

module.exports = Route;
