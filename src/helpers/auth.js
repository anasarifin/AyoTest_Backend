const jwt = require('jsonwebtoken')
module.exports ={
    verify: (req, res, next)=>{
     token = req.headers['x-access-token'] || req.headers['authorization'];
      try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.decoded = decoded
        next();
      } catch (err) {
        res.json({
          msg : 'missing token or invalid token'
        })
      }
    }
  }