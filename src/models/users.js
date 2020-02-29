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
    register: (data, img) => {
        return new Promise((resolve, reject) => {
            conn.query(
                "select email from users where email = ?",
                data.email,
                (err, result) => {
                    if (result.length < 1) {
                        conn.query(
                            "insert into users set name = ?, password = ?, email = ?, picture = ?",
                            [data.name, data.hash, data.email, data.image],
                            (err, res) => {
                                if (!err) {
                                    img.mv("uploads/" + data.image, err => {
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
    // notes update users masih bug ( foto )
    updateUsers: (data, id_users) => {
        return new Promise((resolve, reject) => {
            if (data.image) {
                conn.query(
                    `select * from users where id_users = ${id_users}`,(err, result)=>{
                        fs.unlink("uploads/" + result[0].picture, err => reject(err));
                    }
                );
                conn.query(
                    "update users set name = ?, password = ?, email = ?, picture = ? where id_users = ?",
                    [data.name, data.hash, data.email, data.image, id_users],
                    (err, res) => {
                        if(!err){
                        resolve(res)
                        }else{
                            reject(err)
                        }
                    }
                );
            }else{
                conn.query(`update users set name = '${data.name}', password = '${data.hash}', email = '${data.email}' where id_users = ${id_users}`,(err, result)=>{
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
    }
};
