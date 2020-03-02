const express = require("express");
const Route = express.Router();

const answerController = require("../controllers/answer");

Route.get("/admin", answerController.getAllAnswerByAdmin)
  .get("/users", answerController.getAllAnswerByUser)
  .post("/insert", answerController.insertAnswer)
  .put("/update", answerController.updateAnswer)
  .delete("/delete/", answerController.deleteAnswerByAdmin);

module.exports = Route;
