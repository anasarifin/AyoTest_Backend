const conn = require("../config/db");
const fs = require("fs");

module.exports = {
  getAllQuestion: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  assessment_name.name, assessment_name.code ,bank_question_master.question, bank_question_master.choice_1, bank_question_master.choice_2, bank_question_master.choice_3, bank_question_master.choice_4, bank_question_master.choice_5, bank_question_master.answer_correct FROM `bank_question_master` INNER JOIN assessment_name ON bank_question_master.id_assessment_name=assessment_name.id_assessment WHERE bank_question_master.deleted = 0",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  getQuestionById: id_question => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  assessment_name.name, assessment_name.code ,bank_question_master.question, bank_question_master.choice_1, bank_question_master.choice_2, bank_question_master.choice_3, bank_question_master.choice_4, bank_question_master.choice_5, bank_question_master.answer_correct FROM `bank_question_master` INNER JOIN assessment_name ON bank_question_master.id_assessment_name=assessment_name.id_assessment WHERE bank_question_master.deleted = 0 AND bank_question_master.id_bank_question_master=?",
        id_question,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  insertQuestion: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "INSERT INTO bank_question_master SET ?",
        data,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  updateQuestion: (data, id_question) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE bank_question_master SET ? WHERE id_bank_question_master = ?",
        [data, id_question],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  deleteQuestionById: id_question => {
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE bank_question_master SET deleted=1 WHERE id_bank_question_master=?",
        id_question,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  }
};
