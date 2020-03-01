const scoreModel = require('../models/score');

module.exports = {
    getScore: (req, res) =>{
        const { id_users, id_assessment } = req.query;
        const data = { id_users, id_assessment }
        scoreModel.getScore(data).then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to get score !!'
            })
        })
    },
    addScore: (req, res) => {
        scoreModel.addScore().then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to add score'
            })
        })
    }
}
