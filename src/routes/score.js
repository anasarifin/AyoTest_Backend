const express = require("express");
const Route = express.Router();

const scoreController = require("../controllers/score");
const cacheScore = require("../../auth/redis/redisTopFive");

Route.get("/:id", scoreController.getScore)
	.post("/add", scoreController.addScore)
	.get("/topfive/:id", cacheScore, scoreController.getTopFive)
	.get("/highscore/:id", scoreController.highScore)
	.get("/lastscore/:id", scoreController.lastScore)
	.get("/sort", scoreController.getSortScore)
	.get("/search", scoreController.searchScore);

module.exports = Route;
