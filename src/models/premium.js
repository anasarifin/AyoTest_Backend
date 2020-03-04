const conn = require("../config/db");
const fs = require("fs");

module.exports = {
  premiumAccount: phoneNumber => {
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE admin SET premium=1 WHERE phone=?",
        phoneNumber,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        }
      );
    });
  }
};
