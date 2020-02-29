const connection = require('../configs/db');

module.exports = {
    register: (data)=>{
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users SET ?", data, 
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            })    
        })
    },
    getUser: (email)=>{
        return new Promise((resolve, reject) => {
            connection.query("SELECT id_users, name, email, password, picture FROM user WHERE email=?",email, 
            (err, result)=>{
                if(!err){
                    resolve(result);
                } else {
                  reject(new Error(err));
                }
            })
        })
    },
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users WHERE deleted = 0", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateUser: (id_users, data) => {
      return new Promise((resolve, reject) => {
        connection.query("UPDATE users SET ? WHERE id = ?", [data, id_users], 
        (err, result) => {
          if (!err) {
            console.log("result", result)
            resolve(result);
          } else {
            reject(new Error(err));
          }
        })
      })
    },
    deleteUser: id_users =>{
      return new Promise((resolve, reject)=>{
          connection.query(`UPDATE users SET deleted = 1 WHERE id_users = ${id_users}`,(err, result) =>{
              if(!err){
                  resolve(result);
              }else{
                  reject(err);
              }
          })
      })
  }  
};

  
   