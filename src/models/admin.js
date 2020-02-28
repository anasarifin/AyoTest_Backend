const conn = require("../config/db");
const fs = require("fs");

module.exports = {
    getAllAdmin: () => {
        return new Promise((resolve, reject) => {
            conn.query("select * from admin where deleted = 0", (err, result) => {
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
                "select email from admin where email = ?",
                data.email,
                (err, result) => {
                    if (result.length < 1) {
                        conn.query(
                            "insert into admin set name = ?, password = ?, email = ?, picture = ?",
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
    // notes update admin masih bug ( foto )
    updateAdmin: (data, id_admin) => {
        return new Promise((resolve, reject) => {
            if (data.image) {
                conn.query(
                    `select * from admin where id_admin = ${id_admin}`,(err, result)=>{
                        fs.unlink("uploads/" + result[0].picture, err => reject(err));
                    }
                );
                conn.query(
                    "update admin set name = ?, password = ?, email = ?, picture = ? where id_admin = ?",
                    [data.name, data.hash, data.email, data.image, id_admin],
                    (err, res) => {
                        if(!err){
                        resolve(res)
                        }else{
                            reject(err)
                        }
                    }
                );
            }else{
                conn.query(`update admin set name = '${data.name}', password = '${data.hash}', email = '${data.email}' where id_admin = ${id_admin}`,(err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(err)
                    }
                })
            }
        });
    },
    deleteAdmin: id_admin =>{
        return new Promise((resolve, reject)=>{
            conn.query(`update admin set deleted = 1 where id_admin = ${id_admin}`,(err, result) =>{
                if(!err){
                    resolve(result);
                }else{
                    reject(err);
                }
            })
        })
    }
};
