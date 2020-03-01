const conn = require("../config/db");
const fs = require("fs");

module.exports = {
  generateOTP: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE admin SET otp=? WHERE id_admin=?",
        [data.otp, data.id_admin],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  },

  verifOTP: data => {
    return new Promise((resolve, reject) => {
      otp = "";
      conn.query(
        "SELECT otp FROM admin WHERE id_admin=?",
        data.id_admin,
        (err, result) => {
          result.forEach(e => {
            otp = e.otp;
          });
          if (!err) {
            resolve(otp);
          } else {
            reject(err);
          }
        }
      );
    });
  }
};
