const assessmentModel = require("../models/assessment_name");
// mv for upload image
// const mv = require('mv')

module.exports = {
  getAllAssessmentName: (req, res) => {
    assessmentModel.getAllAssessmentName().then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get All Assessment Name"
      });
    });
  },

  getAllAssessmentNameById: (req, res) => {
    id_assessment_name = req.params.id_assessment_name;
    assessmentModel
      .getAllAssessmentNameById(id_assessment_name)
      .then(result => {
        res.json({
          total: result.length,
          status: 200,
          data: result,
          message: "Success to get Assessment Name by Id"
        });
      });
  },

  getAllAssessmentNameByIdAdmin: (req, res) => {
    id_admin = req.params.id_admin;
    assessmentModel.getAllAssessmentNameByIdAdmin(id_admin).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get Assessment Name by Id Admin"
      });
    });
  },

  insertAssessmentName: (req, res) => {
    let data = {
      id_admin: req.body.id_admin,
      name: req.body.name,
      code: req.body.code
    };
    assessmentModel.insertAssessmentName(data).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success Insert Assessment Name to Database"
      });
    });
  },

  updateAssessmentName: (req, res) => {
    id_assessment = req.params.id_assessment;
    let data = {
      id_admin: req.body.id_admin,
      name: req.body.name,
      code: req.body.code
    };
    assessmentModel.updateAssessmentName(data, id_assessment).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success Update Question"
      });
    });
  },

  deleteAssessmentById: (req, res) => {
    id_assessment = req.params.id_assessment;
    assessmentModel.deleteAssessmentById(id_assessment).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success delete assessment"
      });
    });
  },
  searchAssessment: (req, res) => {
    let name = req.query.name;
    assessmentModel.searchAssessment(name)
      .then(result => {
        res.json({
            total: result.length,
            status: 200,
            data: result,
            message: "Success to get All Assessment Name Search"
          });
      })
      .catch(err => res.json(err));
  }
};