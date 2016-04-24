//User model
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')



var userSchema = new mongoose.Schema({
    facebook: {
    id: String,
    name: String,
    token: String,
    email: String
  },

  schedules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}],

  twitter: {
    id: String,
    name: String,
    username: String,
    token: String
  },

  schedules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}]

})



var User = mongoose.model('User', userSchema)

module.exports = User
