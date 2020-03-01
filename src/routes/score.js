const express = require("express");
const Route = express.Router();

const scoreController = require("../controllers/score");

Route.get("/", scoreController.getScore)
    .post("/add", scoreController.addScore)

module.exports = Route;
