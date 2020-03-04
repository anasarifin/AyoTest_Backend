const express = require("express");
const Route = express.Router();

const adminController = require("../controllers/admin");
const premiumController = require("../controllers/premium");

Route.get("/", adminController.getAllAdmin)
  .post("/login", adminController.login)
  .post("/register", adminController.register)
  .put("/:id", adminController.updateAdmin)
  .put("/", adminController.deleteAdmin)
  .get("/forgot", adminController.forgotPassword)
  .put("/changepassword/:id", adminController.updatePasswordAdmin)

  .post("/change", premiumController.premiumAccount);

module.exports = Route;
