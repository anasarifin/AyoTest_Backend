const express = require("express");
const Route = express.Router();

const assessmentController = require("../controllers/assessment_name");
const otpController = require("../controllers/otp");

Route.get("/", assessmentController.getAllAssessmentName)
  .get(
    "/detail/:id_assessment_name",
    assessmentController.getAllAssessmentNameById
  )
  .get(
    "/detailbyadmin/:id_admin",
    assessmentController.getAllAssessmentNameByIdAdmin
  )
  .put("/delete/:id_assessment", assessmentController.deleteAssessmentById)
  .post("/insert", assessmentController.insertAssessmentName)
  .put("/update/:id_assessment", assessmentController.updateAssessmentName)

  .post("/otp", otpController.generateOTP)
  .post("/otpverif", otpController.verifOTP);

module.exports = Route;
