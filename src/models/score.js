const conn = require("../config/db");

module.exports = {
    getScore: data =>{
        return new Promise((resolve, reject)=>{
            conn.query('select score , id_users, id_assessment, from score_user inner join user on score_user.id_users = users.id_users inner join assessment_name on assessment_name.id_assessment = score_user.id_assessment',
                (err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    addScore: () =>{
        return new Promise((resolve, reject)=>{
            conn.query('insert into score_user set id_users = ?, id_assessment = ?, score = ?, attemp = attemp + 1',
                (err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(err)
                    }
                })
        })
    }
}
