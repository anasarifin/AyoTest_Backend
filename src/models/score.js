const conn = require("../config/db");

module.exports = {
    getScore: data =>{
        return new Promise((resolve, reject)=>{
            conn.query(`select * from score_user where id_user = ${data.id_user}`,
                (err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    addScore: data =>{
        return new Promise((resolve, reject)=>{
            conn.query('insert into score_user set id_user = ?, id_assessment = ?, score = ?, atemp = atemp + ?',
                [data.id_user, data.id_assessment, data.score, data.attemp],
                (err, result)=>{
                    if(!err){
                        resolve(result)
                    }else{
                        reject(err)
                    }
                })
        })
    },
    getTopFive: id_assessment =>{
        return new Promise((resolve, reject)=>{
            conn.query(`select * from score_user where id_assessment = ${id_assessment} order by score desc limit 5`,(err,result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    },
    highScore: id_assessment =>{
    return new Promise((resolve, reject)=>{
        conn.query(`select * from score_user where id_assessment = ${id_assessment} order by score desc`,(err, result)=>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
            }
        })
    })

    },
    lastScore: id_assessment =>{
        return new Promise((resolve, reject)=>{
            conn.query(`select * from score_user where id_assessment = ${id_assessment} order by score asc`, (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(err)
                }
            })
        })
    }
}
