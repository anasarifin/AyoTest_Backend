const express = require("express");
const Route = express.Router();

const questionController = require("../controllers/question");

Route.get("/:code", questionController.getAllQuestion)
  .get("/detail/:id_question", questionController.getQuestionById)
  .patch("/delete/:id_question", questionController.deleteQuestionById)
  .post("/insert", questionController.insertQuestion)
  .put("/update/:id_question", questionController.updateQuestion);
// .delete("/:id", adminController.deleteAdmin);

module.exports = Route;
