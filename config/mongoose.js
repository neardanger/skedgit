var mongoose = require('mongoose'),
  userModel = require('../models/Schedule'),
  scheduleModel = require('../models/User');

module.exports = function(config,dbURL) {
  mongoose.connect(dbURL);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log("Skedgit is Open!");
  });
};
