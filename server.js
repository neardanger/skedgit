var express = require('express');


var app = express();



//Redirect links
var config = require('./config/config');

var port = process.env.PORT || config.development.port

var dbURL = process.env.MONGOLAB_URI || config.development.db


require('./config/express')(app, config);


require('./config/mongoose')(config,dbURL);


app.listen(port);
console.log('Listening on port ' + port + '...');
