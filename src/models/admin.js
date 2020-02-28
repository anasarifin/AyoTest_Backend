const conn = require("../config/db");
const fs = require("fs");

module.exports = {
    getAllAdmin: () => {
        return new Promise((resolve, reject) => {
            conn.query("select * from admin", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
    }
};
