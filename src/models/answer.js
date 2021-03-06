const conn = require("../config/db");
const fs = require("fs");

module.exports = {
  getAllAnswerByAdmin: id_assessment => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  * FROM bank_answer_user WHERE id_assessment_name=?",
        id_assessment,
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

  getAllAnswerByUser: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  * FROM bank_answer_user WHERE id_assessment_name=? AND id_users=?",
        [data.id_assessment, data.id_users],
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

  insertAnswer: data => {
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO bank_answer_user SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      });
    });
  },

  updateAnswer: data => {
    return new Promise((resolve, reject) => {
      console.log(data);
      conn.query(
        "UPDATE bank_answer_user SET answer = ?  WHERE id_users = ? AND id_assessment_name = ?",
        [data.answer, data.id_users, data.id_assessment_name],
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

  deleteAnswer: id_assessment => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE bank_answer_name WHERE id_assessment=?",
        id_assessment,
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
