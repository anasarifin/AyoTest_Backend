const scoreModel = require('../models/score');
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT);

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
        const { id_user, id_assessment, score, atemp } = req.body;
        const data = { id_user, id_assessment, score, atemp }
        scoreModel.addScore(data).then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to add score'
            })
        })
    },
    getTopFive: (req, res) => {
        const id_assessment = parseInt(req.params.id);
        scoreModel.getTopFive(id_assessment).then(result =>{
            client.setex(id_assessment, 300, JSON.stringify(result));
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to get top five'
            })
        })
    },
    highScore: (req, res) => {
        const id_assessment = parseInt(req.params.id);
        scoreModel.highScore(id_assessment).then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result[0],
                message: 'success to get highscore'
            })
        })
    },
    lastScore: (req, res) =>{
        const id_assessment = parseInt(req.params.id);
        scoreModel.lastScore(id_assessment).then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result[0],
                message: 'success to get last score'
            })
        })
    },
    getSortScore: (req, res) =>{
        const id_user = req.query.id_user;
        const order = req.query.order;
        const data = { id_user }
        let orders;
        if (!order){
            orders = '0'
        }else{
            orders = order 
        }
        scoreModel.getSortScore(data, orders).then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to get score !!'
            })
        })
    }
    ,
    searchScore: (req, res) => {
                let name = req.query.name;
                let id_user = req.query.id_user
                console.log(name)
                scoreModel.searchScore(name, id_user)
            .then(result => {
                res.json({
                                    total: result.length,
                                    status: 200,
                                    data: result,
                                    message: "Success to get All score Name Search"
                                  
                });
                          
            })
                  .catch(err => res.json(err));
              
    }
}
