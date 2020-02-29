const usersModel = require('../models/users')
// mv for upload image
// const mv = require('mv')
const conn = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    getAllUsers: (req, res) => {
        usersModel.getAllUsers().then(result =>{
            res.json({
                total: result.length,
                status: 200,
                data: result,
                message: 'succes to get All Users'
            })
        })
    },
    login: (req, res) => {
    const { email, password } = req.body

    if (email) {
      conn.query('select * from users where email = ?', email, (err, result) => {
        if (result.length < 1) {
          return res.status(400).json({
            success: false,
            message: 'email and password not found'
          })
        }

        const passwordCheck = bcrypt.compareSync(password, result[0].password)
        if (!passwordCheck) {
          return res.status(400).json({
            success: false,
            message: 'email and password not found'
          })
        }

        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);

        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: '24h' })
        res.json({
          success: true,
          message: 'authentication success!',
          expiresIn: tomorrow,
          token: token
        })
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'please insert email or password'
      })
    }
  },

  register: (req, res) => {
    const saltRounds = 10
    const img = req.files.image
    const fileType = img.mimetype
    const deleted = 0;

    const { name, email, password } = req.body
     if ( req.files || Object.keys(req.files).length > 0 ) {


    if (fileType === 'image/png') {
      type = 'png'
        }
    if (fileType === 'image/gif') {
      type = 'gif'
    }
    if (fileType === 'image/jpeg') {
      type = 'jpg'
    }
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)

      const random_id = Math.floor(Math.random() * 10) + 4
      const image = 'img-' + Date.now() + '-' + random_id + '.' + type

      const data = { name, hash, email, image, deleted }

      usersModel.register(data, img).then(() => {
        res.json({
          status: 200,
          message: 'registration success'
        })
      }).catch(err => {
        res.status(500).json({
          status: 500,
          message: err
        })
      })
    } else {
      res.status(500).json({
        status: 500,
        message: 'please insert email and password'
      })
    }
  },
    // notes update users masih bug ( foto )
    updateUsers: (req, res) => {
        const { name, password, email } = req.body;
        const id_users = parseInt(req.params.id);
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)

        var data;
        if(!req.files || Object.keys(req.files).length === 0){
            data = { name, hash, email }
            console.log('no image update')
        }else{
        let img = req.files.image;
        let fileType = img.mimetype;
        let type = '';
        if (fileType === 'image/png') {
      type = 'png'
        }
        if (fileType === 'image/gif') {
      type = 'gif'
    }
    if (fileType === 'image/jpeg') {
      type = 'jpg'
    }
            const random_id = Math.floor(Math.random() * 10) + 4;
            const image = 'img-' + Date.now() + '-' + random_id + '.' + type;
            img.mv('uploads/'+ image, err =>{
                if (err) return res.status(200).send('update data with image')
            })
             data = { name, image, hash, email }
        }
        usersModel.updateUsers(data, id_users).then(()=>{
            res.json({
                status: 200,
                message: 'update users success',
                data: data,
                id: id_users
                })
                
            }).catch(err =>{
                res.json({
                    status: 500,
                    message: err
                })
            })
    },
    deleteUsers: (req, res) => {
        const id_users = req.query.delete;
        usersModel.deleteUsers(id_users).then(result => {
            res.json({
                status: 200,
                message: 'delete users success'
            }).catch(err =>{
                res.status(500).json({
                    status: 500,
                    message: err
                })
            })
        })
    }
}