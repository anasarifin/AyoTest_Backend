const express = require('express');

const users = require('./routes/users');
const Router = express.Router();

Router.use('/users', users);

module.exports = Router;