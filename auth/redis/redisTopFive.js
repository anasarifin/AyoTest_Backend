const redis = require('redis')
const client = redis.createClient(process.env.REDIS_HOST);


redisTopFive = (req, res, next) => {
  const { id } = req.params;

  client.get(id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(data);
    } else {
      //proceed to next middleware function
      next();
    }
  });
}

module.exports = redisTopFive;
