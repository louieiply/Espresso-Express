const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env' )});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/final-project-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
