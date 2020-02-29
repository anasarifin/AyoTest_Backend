const conn = require("../config/db");

module.exports = {
    creatUser: (data)=>{
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
            conn.query("select * from users", (err, result) => {
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
        conn.query("UPDATE users SET ? WHERE id = ?", [data, id_users], 
        (err, result) => {
          if (!err) {
            console.log("result", result)
            resolve(result);
          } else {
            reject(new Error(err));
          }
        })
      })
    }  
};

  
   