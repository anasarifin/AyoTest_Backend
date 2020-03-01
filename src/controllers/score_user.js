// const scoreModel = require('../models/score_user')
// // const conn = require('../config/db')

// module.exports = {
//     insertScoreUser: (req, res) => {
//         console.log('terpanggil')
//         let data = {
//           id_user: req.body.id_user,
//           id_assessment: req.body.id_assessment,
//           score: req.body.score
//         };
//         scoreModel.insertScoreUser(data).then(result => {
//           res.json({
//             total: result.length,
//             status: 200,
//             data: result,
//             message: "Success Insert Score User to Database"
//           });
//         });
//       },
//       getScoreUser: (req, res) => {
//         scoreModel.getScoreUser()
//         .then(result => {
//           res.json({
//             total: result.length,
//             status: 200,
//             data: result,
//             message: "Success to get Score User"
//           });
//         });
//       },
//       getAllTopFiveScore: (req, res) => {
//         id_user = req.params.id_user;
//         id_assessment = req.params.id_assessment;
//         scoreModel.getAllTopFiveScore(id_user, id_assessment_name)
//           .then(result => {
//             res.json({
//               total: result.length,
//               status: 200,
//               data: result,
//               message: "Success to get All Top 5 Score"
//             });
//           });
//       }
    
// }


