const adminModel = require('../models/admin')
// mv for upload image
// const mv = require('mv')

module.exports = {
    getAllAdmin: (req, res) => {
        adminModel.getAllAdmin().then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to get All Admin'
            })
        })
    },

}
