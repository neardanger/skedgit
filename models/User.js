//User model
var mongoose = require('mongoose')

var userScehma = new mongoose.Schema({

  name:{type:String, required:true, unique: true},
  password:{type:String, required: true, unique: true}
  schedules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}]
})

var User = mongoose.model('User', userScehma)

module.exports = User
