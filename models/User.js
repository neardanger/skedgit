//User model
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')



var userScehma = new mongoose.Schema({
    facebook: {
    id: String,
    name: String,
    token: String,
    email: String
  },
  schedules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}]
})



var User = mongoose.model('User', userScehma)

module.exports = User
  
