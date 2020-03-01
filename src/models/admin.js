const conn = require("../config/db");
const fs = require("fs");
const nodemailer = require('nodemailer');
const service = require('../../gmail');

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
                            "insert into admin set name = ?, password = ?, email = ?, picture = ?, gender = ?, phone = ?, deleted = ?",
                            [data.name, data.hash, data.email, data.image, data.gender, data.phone, data.deleted],
                            (err, res) => {
                                if (!err) {

                                    
                                    // upload image to folder uploads
                                    img.mv("uploads/admin/" + data.image, err => {
                                        if (err) return res.json(500).send(err);
                                        console.log('upload image succes')
                                    });


                                    const transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: service.email,
                                            pass: service.password
                                        }
                                    });
                                    const mailOptions = {
                                        from: service.email, 
                                        to: `${data.email}`,
                                        subject: 'Welcome to AyoTest!',
                                        text: `Hai ${data.name} !, thank you for registering in our apps!`
                                    }
                                    transporter.sendMail(mailOptions, function (err, info) {
                                    if(!err){
                                        console.log(info)
                                    }else{
                                        console.log(err)
                                    }
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
    updateAdmin: (data, id_admin) => {
        return new Promise((resolve, reject) => {
            if (data.image) {
                conn.query(
                    `select * from admin where id_admin = ${id_admin}`,(err, result)=>{
                        fs.unlink("uploads/admin/" + result[0].picture, () => resolve(err));
                    }
                );
                conn.query(
                    "update admin set name = ?, gender = ?, password = ?, email = ?, phone = ?, picture = ? where id_admin = ?",
                    [data.name,data.gender, data.hash, data.email, data.phone, data.image, id_admin],
                    (err, res) => {
                        if(!err){
                        resolve(res)
                        }else{
                            reject(err)
                        }
                    }
                );
            }else{
                conn.query(`update admin set name = '${data.name}', gender = '${data.gender}', password = '${data.hash}', email = '${data.email}', phone = ${data.phone} where id_admin = ${id_admin}`,(err, result)=>{
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
    },
    forgotPassword: (data,hash) =>{
        return new Promise((resolve, reject)=>{
            conn.query(`select * from admin where email = '${data.email}'`,(err, result)=>{
                if(result.length > 0){
            conn.query(`update admin set password = '${hash}' where email = '${data.email}'`,(err, result)=>{
                if(!err){


                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: service.email,
                                pass: service.password
                            }
                        });
                        const mailOptions = {
                            from: service.email, 
                            to: `${data.email}`,
                            subject: 'Forgot Password',
                            html: `dear ${data.email}, you have request to change password via forgot password,<br><br>
                            <p>this is your new random Password : <a>${data.password}</a></p>
                            <p>please login and change your new random password with your new password, thanks</p>`
                        }
                    transporter.sendMail(mailOptions, function (err, info) {
                        if(!err){
                            resolve(result)
                        }else{
                            reject(err)
                        }
                    });
                }else{
                    reject(err)
                }
            })

                }else{
                    reject('email not found please register first');
                }
            })
        })
    },
};
