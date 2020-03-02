const conn = require("../config/db");
const fs = require("fs");

module.exports = {
  getAllQuestion: () => {
    let data = [];
    let no = 0;
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  bank_question_master.id_bank_question_master, assessment_name.name, assessment_name.code ,bank_question_master.question, bank_question_master.choice_1, bank_question_master.choice_2, bank_question_master.choice_3, bank_question_master.choice_4, bank_question_master.choice_5 FROM `bank_question_master` INNER JOIN assessment_name ON bank_question_master.id_assessment_name=assessment_name.id_assessment WHERE bank_question_master.deleted = 0",
        (err, result) => {
          console.log(result);
          const data = result.map((x, index) => {
            return {
              no: index + 1,
              id: x.id_bank_question_master,
              code: x.code,
              question: x.question,
              answer: [
                { label: x.choice_1, value: 1 },
                { label: x.choice_2, value: 2 },
                { label: x.choice_3, value: 3 },
                { label: x.choice_4, value: 4 },
                { label: x.choice_5, value: 5 }
              ]
            };
          });
          // result.map(e => {
          //   data.no_soal = no + 1;
          //   data.question = e.question;
          //   data.answer = [
          //     { label_1: e.choice_1, value: 1 },
          //     { label_2: e.choice_2, value: 2 },
          //     { label_3: e.choice_3, value: 3 },
          //     { label_4: e.choice_4, value: 4 },
          //     { label_5: e.choice_5, value: 5 }
          //   ];
          // });
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  getQuestionById: id_question => {
    let data = {};
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  assessment_name.name, assessment_name.code ,bank_question_master.question, bank_question_master.choice_1, bank_question_master.choice_2, bank_question_master.choice_3, bank_question_master.choice_4, bank_question_master.choice_5 FROM `bank_question_master` INNER JOIN assessment_name ON bank_question_master.id_assessment_name=assessment_name.id_assessment WHERE bank_question_master.deleted = 0 AND bank_question_master.id_bank_question_master=?",
        id_question,
        (err, result) => {
          const data = result.map((x, index) => {
            return {
              no: index + 1,
              question: x.question,
              answer: [
                { label: x.choice_1, value: 1 },
                { label: x.choice_2, value: 2 },
                { label: x.choice_3, value: 3 },
                { label: x.choice_4, value: 4 },
                { label: x.choice_5, value: 5 }
              ]
            };
          });
          if (!err) {
            resolve(data);
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
