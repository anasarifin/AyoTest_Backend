const express = require("express");
const Route = express.Router();

const usersController = require("../controllers/users");

Route.get("/", usersController.getAllUsers)
    .post("/login", usersController.login)
    .post("/register", usersController.register)
    .put("/:id", usersController.updateUsers)
    .put("/", usersController.deleteUsers)
    .get('/',usersController.searchUser)
    .get('/search',usersController.searchUser)
    .get("/:id_users", usersController.detailUsers)
    .put("/changepassword/:id", usersController.updatePasswordUser)


module.exports = Route;
