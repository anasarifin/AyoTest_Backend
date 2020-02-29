const bcrypt = require('bcryptjs')
const usersModel = require('../models/users');
const miscHelper = require('../helpers/helpers');
module.exports = {
    register:(req, res)=>{
        const {name, email, password, picture} = req.body 
        if (!email){
            return miscHelper.response(res, {}, 422, "can't email empty")
        }
        if (!password){
            return miscHelper.response(res, {}, 422, "can't password empty")
        }
        if (!name){
            return miscHelper.response(res, {}, 422, "can't name empty")
        }
        const data = {
            name,
            email,
            password: miscHelper.hashPassword(password),
            picture:picture
            
        }
        usersModel.register(data)
        .then((result) => {
            miscHelper.response(res, result, 201)
          })
          .catch(err=>{
              console.log(err)
              
            miscHelper.response(res, {}, res.status, err)})
    },
    login:async(req, res)=>{
        const {email, password} = req.body
        if (!email){
            return miscHelper.response(res, {}, 422, "can't email empty")
        }
        if (!password){
            return miscHelper.response(res, {}, 422, "can't password empty")
        }
        await usersModel.getUser(email)
        .then((result)=>{
            if(!result.length){
                return miscHelper.response(res, {}, 422, "not registered")
            }else{
                if(!bcrypt.compareSync(password, result[0].password)){
                    return miscHelper.response(res, {}, 422, "invalid password")
                }
                const {id_users, email, name} = result[0]
                // console.log(id)
                const token = miscHelper.generateToken(id_users, email, name)
                return miscHelper.response(res, {token:token}, 201, "succes login")
            }
        })
        .catch(err =>{
            console.log(err)
        })
        
    },
    getAllUsers: (res)=>{
          usersModel.getAllUsers()
          .then((result)=>{
            miscHelper.response(res, result)
          })
          .catch(err=>{
            miscHelper.response(res, {}, res.status, err)
          })
      },
      updateUser: (req, res) => {
        const id_users = req.params.id_users
        const {name, email, password, picture} = req.body;
        const data = {
          name,
          email,
          password,
          picture:picture
        }
        usersModel.updateUser(id_users,data)
          .then((result) => {
            res.json(result)
          })
          .catch(err=>{
              miscHelper.response(res, {}, res.status, err)
            })
      },
      deleteUser: (req, res) => {
        const id_users = req.query.delete;
        usersModel.deleteUser(id_users)
        .then((result) => {
            res.json(result)
          })
          .catch(err=>{
              miscHelper.response(res, {}, res.status, err)
            })
    }
    
}