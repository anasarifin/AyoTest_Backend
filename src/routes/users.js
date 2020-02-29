const express = require("express");
const multer = require('multer');
const Route = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './src/uploads')
    },
    filename: function(req, file, cb){
      cb(null, new Date().toISOString() + file.originalname)
    }
  })
const path = require('path')
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
})

const usersController = require("../controllers/users.js");

Route.get("/", usersController.getAllUsers)
    .post("/login", usersController.login)
    .post("/register", usersController.register)
    .put("/:id", usersController.updateUser)
    .put('/', upload.single('image'), usersController.updateUser)


module.exports = Route;