const express = require("express");
const Route = express.Router();

// import all routes

// Routes

const admin = require("./routes/admin");
const users = require('./routes/users')
const question = require("./routes/question");
const assessment_name = require("./routes/assessment_name");
// Routes
Route.use("/admin", admin);
Route.use('/users', users)
Route.use("/question", question);
Route.use("/assessment", assessment_name);

module.exports = Route;
