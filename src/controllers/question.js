const questionModel = require("../models/question");
// mv for upload image
// const mv = require('mv')

module.exports = {
  getAllQuestion: (req, res) => {
    questionModel.getAllQuestion().then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get All Question"
      });
    });
  },

  getQuestionById: (req, res) => {
    id_question = req.params.id_question;
    questionModel.getQuestionById(id_question).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get Question by Id"
      });
    });
  },

  insertQuestion: (req, res) => {
    let data = {
      id_assessment_name: req.body.id_assessment_name,
      question: req.body.question,
      answer_correct: req.body.answer_correct,
      choice_1: req.body.choice_1,
      choice_2: req.body.choice_2,
      choice_3: req.body.choice_3,
      choice_4: req.body.choice_4,
      choice_5: req.body.choice_5,
      deleted: 0
    };
    questionModel.insertQuestion(data).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success Insert Question to Database"
      });
    });
  },

  updateQuestion: (req, res) => {
    id_question = req.params.id_question;
    let data = {
      question: req.body.question,
      answer_correct: req.body.answer_correct,
      choice_1: req.body.choice_1,
      choice_2: req.body.choice_2,
      choice_3: req.body.choice_3,
      choice_4: req.body.choice_4,
      choice_5: req.body.choice_5
    };
    questionModel.updateQuestion(data, id_question).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success Update Question"
      });
    });
  },

  deleteQuestionById: (req, res) => {
    id_question = req.params.id_question;
    questionModel.deleteQuestionById(id_question).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success delete question"
      });
    });
  }
};
