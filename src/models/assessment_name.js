const conn = require("../config/db");
const fs = require("fs");

module.exports = {
    getAllAssessmentNameById: id_assessment => {
        return new Promise((resolve, reject) => {
            conn.query(
                "SELECT  * FROM assessment_name WHERE id_assessment=?",
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
  getAllAssessmentName: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT  * FROM assessment_name WHERE deleted=0",
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

  getAllAssessmentNameById: id_assessment => {
    return new Promise((resolve, reject) => {
      let ex_id_assessment = 0;
      let ex_id_admin = 0;
      let ex_name = "";
      let ex_code = 0;
      let ex_deleted = 0;
      let ex_hide = 0;
      let ex_jumlah_soal = 0;
      let ex_jumlah_peserta = 0;

      conn.query(
        "SELECT COUNT(id_users) AS 'jumlah_peserta'  FROM bank_answer_user WHERE id_assessment_name=?",
        id_assessment,
        (err, hasil) => {
          hasil.map(e => {
            ex_jumlah_peserta = e.jumlah_peserta;
          });
          conn.query(
            "SELECT  assessment_name.* , COUNT(bank_question_master.id_assessment_name) AS 'jumlah_soal'  FROM assessment_name INNER JOIN bank_question_master ON bank_question_master.id_assessment_name = assessment_name.id_assessment WHERE id_assessment=?",
            id_assessment,
            (err, result) => {
              result.forEach(e => {
                (ex_id_assessment = e.id_assessment),
                  (ex_id_admin = e.id_admin),
                  (ex_name = e.name),
                  (ex_code = e.code),
                  (ex_deleted = e.ex_deleted),
                  (ex_hide = e.hide),
                  (ex_jumlah_soal = e.jumlah_soal);
              });
              let data = {
                id_assessment: ex_id_assessment,
                id_admin: ex_id_admin,
                name: ex_name,
                code: ex_code,
                deleted: ex_deleted,
                hide: ex_hide,
                jumlah_peserta: ex_jumlah_peserta,

                jumlah_soal: ex_jumlah_soal
              };
              if (!err) {
                resolve(data);
              } else {
                reject(err);
              }
            }
          );
        }
      );
    });
  },


    insertAssessmentName: data => {
        return new Promise((resolve, reject) => {
            conn.query(
                "INSERT INTO assessment_name SET ?",
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

    updateAssessmentName: (data, id_assessment) => {
        console.log(id_assessment);
        return new Promise((resolve, reject) => {
            conn.query(
                "UPDATE assessment_name SET ? WHERE id_assessment = ?",
                [data, id_assessment],
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

    deleteAssessmentById: id_assessment => {
        return new Promise((resolve, reject) => {
            conn.query(
                "UPDATE assessment_name SET deleted=1 WHERE id_assessment=?",
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

    // check code assessment Input User
    checkAssessmentInputUser: code => {
        return new Promise((resolve, reject) => {
            conn.query(
                "SELECT name FROM  assessment_name WHERE deleted=0 AND hide=0 AND code=?",
                code,
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

    hideAssessmentName: data => {
        // console.log(id_assessment);
        return new Promise((resolve, reject) => {
            conn.query(
                "UPDATE assessment_name SET hide=? WHERE id_assessment = ?",
                [data.hide, data.id_assessment],
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
 // merge from hima (search assessment)
  searchAssessment: name => {
    return new Promise((resolve, reject) => {
      console.log("name", name);
      conn.query(
        `SELECT an.id_assessment, an.name, a.id_admin, a.name as admin_name FROM assessment_name as an LEFT JOIN admin as a ON an.id_admin=a.id_admin WHERE an.name LIKE '%${name}%'`,
        (err, result) => {
          console.log(result);
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
