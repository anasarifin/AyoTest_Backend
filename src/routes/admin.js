const express = require("express");
const Route = express.Router();

const adminController = require("../controllers/admin");

Route.get("/", adminController.getAllAdmin)
    .post("/login", adminController.login)
    .post("/register", adminController.register)
    .put("/:id", adminController.updateAdmin)
    .put("/", adminController.deleteAdmin)
    .get("/forgot", adminController.forgotPassword)
    .put("/changepassword/:id", adminController.updatePasswordAdmin)

module.exports = Route;
