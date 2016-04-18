var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://localhost/skedgit',
    port: 8000
  },
  rootPath: rootPath
}

//To host on mongo
