const express = require("express");
const Route = express.Router();

const usersController = require("../controllers/users");

Route.get("/", usersController.getAllUsers)
    .post("/login", usersController.login)
    .post("/register", usersController.register)
    .put("/:id", usersController.updateUsers)
    .put("/", usersController.deleteUsers);

module.exports = Route;