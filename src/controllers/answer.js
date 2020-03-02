const answerModel = require("../models/answer");

module.exports = {
  getAllAnswerByAdmin: (req, res) => {
    id_assessment = req.body.id_assessment;
    answerModel.getAllAnswerByAdmin(id_assessment).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get All Answer by ID Assessment"
      });
    });
  },

  getAllAnswerByUser: (req, res) => {
    let data = {
      id_users: req.body.id_users,
      id_assessment: req.body.id_assessment
    };
    answerModel.getAllAnswerByUser(data).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get All Answer by ID Assessment & ID User"
      });
    });
  },

  insertAnswer: (req, res) => {
    let data = {
      id_users: req.body.id_user,
      id_assessment_name: req.body.id_assessment,
      answer: req.body.answer,
      question_queue: req.body.question_queue
    };
    answerModel.insertAnswer(data).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get Assessment Name by Id"
      });
    });
  },

  updateAnswer: (req, res) => {
    let data = {
      id_users: req.body.id_user,
      id_assessment_name: req.body.id_assessment,
      answer: req.body.answer,
      question_queue: req.body.question_queue
    };
    answerModel.updateAnswer(data).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success Update Answer"
      });
    });
  },

  deleteAnswerByAdmin: (req, res) => {
    id_assessment = req.params.id_assessment;
    answerModel.deleteAnswer(id_assessment).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success delete assessment"
      });
    });
  }
};
