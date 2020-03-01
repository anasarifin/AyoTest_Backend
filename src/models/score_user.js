// const conn = require("../config/db");

// module.exports = {
//     insertScoreUser: data => {
//         return new Promise((resolve, reject) => {
//           let a = 1
//           conn.query("SELECT id_score, attempt, MAX (attempt) FROM score_user WHERE id_user=? and id_assessment=? GROUP BY id_score", [data.id_user, data.id_assessment], (err,result)=>{
//               if (!err){
//                   console.log('ini terpanggil',result.length)
//                 if(result.length===0){
//                     data.attempt=1
//                     conn.query("INSERT INTO score_user SET ?", data, (err, result) => {
//                             if (!err) {
//                               resolve(result);
//                             } else {
//                               reject(err);
//                             }
//                           });
//                 } else {
//                     console.log(result[0][attempt])
//                 }
//               } else {
//                   console.log(err)
//               }
//           })
        
//         });
//       },
//       getScoreUser: (id_user, id_assessment) => {
//           return new Promise((resolve,reject)=>{
//               conn.query("SELECT * FROM score_user WHERE id_user=? and id_assessment=?", [id_user, id_assessment],
//               (err,result)=>{
//                 if (!err) {
//                     resolve(result);
//                   } else {
//                     reject(err);
//                   }
//               })
//           })
//       },
//       getAllTopFiveScore: (id_assessment) => {
//         return new Promise((resolve,reject)=>{
//             conn.query("SELECT * FROM score_user WHERE id_assessment=?", [id_assessment],
//             (err,result)=>{
//               if (!err) {
//                   resolve(result);
//                 } else {
//                   reject(err);
//                 }
//             })
//         })
//     }

// }