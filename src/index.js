const express = require("express");
const Route = express.Router();

// import all routes
const admin = require("./routes/admin");
const question = require("./routes/question");
// Routes
Route.use("/admin", admin);
Route.use("/question", question);

module.exports = Route;
