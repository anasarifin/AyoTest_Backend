const scoreModel = require('../models/score');

module.exports = {
    getScore: (req, res) =>{
        const id_user = req.query.id_user;
        const data = { id_user }
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
        const { id_user, id_assessment, score, attemp } = req.body;
        const data = { id_user, id_assessment, score, attemp }
        scoreModel.addScore(data).then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to add score'
            })
        })
    }
}
