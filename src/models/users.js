const conn = require("../config/db");
const fs = require("fs");

module.exports = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            conn.query("select * from users where deleted = 0", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    },
    detailUsers:(id_users) => {
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * FROM users WHERE id_users=?',id_users, (err,result)=>{
                if (!err){
                    resolve(result);
                } else {
                    reject(err);
                }
            })
        })
    },
    register: (data, img) => {
        return new Promise((resolve, reject) => {
            conn.query(
                "select email from users where email = ?",
                data.email,
                (err, result) => {
                    if (result.length < 1) {
                        conn.query(
                            "insert into users set name = ?, password = ?, email = ?, gender = ?, picture = ?, phone = ?, deleted = ?, address = ?",
                            [data.name, data.hash, data.email, data.gender, data.image, data.phone, data.deleted, data.address],
                            (err, res) => {
                                if (!err) {
                                    img.mv("uploads/users/" + data.image, err => {
                                        if (err) return res.json(500).send(err);
                                        console.log("upload success");
                                    });

                                    resolve(res);
                                } else {
                                    reject(err);
                                }
                            }
                        );
                    } else {
                        reject("email already in use");
                    }
                }
            );
        });
    },
    updateUsers: (data, id_users) => {
        return new Promise((resolve, reject) => {
            if (data.image) {
                conn.query(
                    `select * from users where id_users = ${id_users}`,(err, result)=>{
                        fs.unlink("uploads/users/" + result[0].picture, () => resolve(err));
                    }
                );
                conn.query(
                    "update users set name = ?, password = ?, email = ?, gender =  ?, picture = ?, phone = ?, address = ? where id_users = ?",
                    [data.name, data.hash, data.email, data.gender, data.image, data.phone, data.address, id_users],
                    (err, res) => {
                        if(!err){
                        resolve(res)
                        }else{
                            reject(err)
                        }
                    }
                );
            }else{
                conn.query(`update users set name = '${data.name}', password = '${data.hash}', email = '${data.email}', gender = '${data.gender}' phone = '${data.phone}', address = '${data.address}' where id_users = ${id_users}`,(err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(err)
                    }
                })
            }
        });
    },
    deleteUsers: id_users =>{
        return new Promise((resolve, reject)=>{
            conn.query(`update users set deleted = 1 where id_users = ${id_users}`,(err, result) =>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    },
      searchUser: (name) => {
        return new Promise((resolve, reject) => {
          conn.query(
            `SELECT id_users, users.name as 'siswa', assessment_name.name as 'assessment', score_user.score, score_user.date FROM users INNER JOIN score_user ON score_user.id_user=users.id_users INNER JOIN assessment_name ON score_user.id_assessment=assessment_name.id_assessment WHERE users.name LIKE '%${name}%'`,
            (err, result) => {
              console.log(result);
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            },
          );
        });
      }
};
