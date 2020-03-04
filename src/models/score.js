const conn = require("../config/db");

module.exports = {
  getScore: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        `select score_user.* , assessment_name.name AS 'assessment' , admin.name AS 'teacher' from score_user INNER JOIN assessment_name ON  score_user.id_assessment = assessment_name.id_assessment INNER JOIN admin ON assessment_name.id_admin=admin.id_admin where id_user = ${data.id_user}`,
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
  addScore: data => {
    return new Promise((resolve, reject) => {
      conn.query(
        "insert into score_user set id_user = ?, id_assessment = ?, score = ?, atemp = atemp + 1?",
        [data.id_user, data.id_assessment, data.score, data.atemp],
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
  getTopFive: id_assessment => {
    return new Promise((resolve, reject) => {
      conn.query(
        `select * from score_user where id_assessment = ${id_assessment} order by score desc limit 5`,
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
  highScore: id_assessment => {
    return new Promise((resolve, reject) => {
      conn.query(
        `select * from score_user where id_assessment = ${id_assessment} order by score desc`,
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
  lastScore: id_assessment => {
    return new Promise((resolve, reject) => {
      conn.query(
        `select * from score_user where id_assessment = ${id_assessment} order by score asc`,
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
    getSortScore: (data, order) => {
    return new Promise((resolve, reject) => {
      let sortBy = "score";
      if (sortBy) {
        const sortableColumn = ['score']
        if (!sortableColumn.includes(sortBy)) {
          reject(new Error('invalid sort column'))
        }
        let orderBy;
        if(order=='0'){
            orderBy='';
        }else{
            orderBy=`order by ${sortBy} ${order}`;
        }
        conn.query(`select score_user.* , assessment_name.name AS 'assessment' , admin.name AS 'teacher' from score_user INNER JOIN assessment_name ON  score_user.id_assessment = assessment_name.id_assessment INNER JOIN admin ON assessment_name.id_admin=admin.id_admin where id_user = ${data.id_user} ${orderBy}`,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(err);
          }
        });
        
        }
      })
    }
};
