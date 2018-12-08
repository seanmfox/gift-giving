const mongoose = require('mongoose');
const dotenv = require('dotenv');

require('dotenv').config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Group = require('./group');