const otpModel = require("../models/otp");

//OTP Configuration SMS
var TeleSignSDK = require("telesignsdk");
const customerId = "01819DF1-1489-4D4F-A2FD-2002021F4DC7";
const apiKey =
  "oXLPMnk4dHowNpu5eN+xsGGoqC0ZWoUE14CAswZNFfaQMiqchdVy5JS5GB8gqiNrUDrQCd3QwAtN4Lrb9qThTg==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10 * 1000; // 10 secs
const client = new TeleSignSDK(
  customerId,
  apiKey,
  rest_endpoint,
  timeout // optional
  // userAgent
);

module.exports = {
  generateOTP: (req, res) => {
    let data = {
      id_admin: req.body.id_admin,
      phoneNumber: req.body.phoneNumber,
      otp: Math.random()
        .toString(36)
        .substring(7)
    };

    const message =
      "Gunakan kode ini untuk login ke aplikasi AyoTest kamu : " + data.otp;
    const messageType = "OTP";
    console.log(data);
    otpModel.generateOTP(data).then(result => {
      client.sms.message(
        console.log("sending OTP to Userphone"),
        data.phoneNumber,
        message,
        messageType
      );
      res.json({
        total: result.length,
        status: 200,
        data: result,
        message: "Success Send OTP to user phone number"
      });
    });
  },

  verifOTP: (req, res) => {
    let data = {
      id_admin: req.body.id_admin,
      code: req.body.code
    };
    otpModel.verifOTP(data).then(result => {
      if (result === data.code) {
        console.log("Verifikasi Berhasil");
        res.json({
          total: result.length,
          status: 200,
          data: result,
          message: "Success verified code"
        });
      } else {
        res.json({
          total: result.length,
          status: 403,
          data: "Kode salah!",
          message: "Failed verified code"
        });
      }
    });
  }
};
