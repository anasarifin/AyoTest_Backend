const premiumModel = require("../models/premium");

module.exports = {
  premiumAccount: (req, res) => {
    phoneNumber = req.body.phoneNumber;
    console.log(phoneNumber);
    premiumModel.premiumAccount(phoneNumber).then(result => {
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success to get All Answer by ID Assessment"
      });
    });
  }
};
