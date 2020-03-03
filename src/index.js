const express = require("express");
const Route = express.Router();

// import all routes

const admin = require("./routes/admin");
const users = require("./routes/users");
const score = require("./routes/score");
const question = require("./routes/question");
const assessment_name = require("./routes/assessment_name");
const otp = require("./routes/otp");
const answer = require("./routes/answer");

// Routes
Route.use("/admin", admin);
Route.use("/score", score);
Route.use("/users", users);
Route.use("/question", question);
Route.use("/assessment", assessment_name);
Route.use("/otp", otp);
Route.use("/answer", answer);



// Routes
Route.use('/users', users)
Route.use("/assessment", assessment_name);
module.exports = Route
