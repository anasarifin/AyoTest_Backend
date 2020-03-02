const express = require("express");
const Route = express.Router();

const scoreController = require("../controllers/score");

Route.get("/", scoreController.getScore)
    .post("/add", scoreController.addScore)
    .get("/topfive/:id", scoreController.getTopFive)
    .get("/highscore/:id", scoreController.highScore)
    .get("/lastscore/:id", scoreController.lastScore)

module.exports = Route;
