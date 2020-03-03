const conn = require("../config/db");
const fs = require("fs");

module.exports = {
    getAllAssessmentName: () => {
        return new Promise((resolve, reject) => {
            conn.query("SELECT  * FROM assessment_name", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    },

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

    getAllAssessmentNameByIdAdmin: id_admin => {
        return new Promise((resolve, reject) => {
            conn.query(
                "SELECT  * FROM assessment_name WHERE id_admin=?",
                id_admin,
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
