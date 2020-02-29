const express = require("express");
const Route = express.Router();

// import all routes
const admin = require("./routes/admin");
const question = require("./routes/question");
const assessment_name = require("./routes/assessment_name");
// Routes
Route.use("/admin", admin);
Route.use("/question", question);
Route.use("/assessment", assessment_name);

module.exports = Route;
