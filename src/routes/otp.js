const express = require("express");
const Route = express.Router();

const otpController = require("../controllers/otp");

Route.post("/otp", otpController.generateOTP).post(
  "/otpverif",
  otpController.verifOTP
);

module.exports = Route;
