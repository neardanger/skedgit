//User model
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')


//This is where you store all of the user models
var userSchema = new mongoose.Schema({

//The local user model so you can use it with the Strategy
//thats located in the passport strategy named "local"
    local:{
      name:{type: String, unique: true},
      email: String,
      password: String
    },

    facebook: {
    id: String,
    name: String,
    token: String,
    email: String
  },


  twitter: {
    id: String,
    name: String,
    username: String,
    token: String,
    email: String
  },

  schedules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'}]

})

//The lines below use specialized bcrypt methodology such as generate hash
// and compare sync

//This creates a hash for the passwword that the user creates 8 is strong enough
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
//searches the schema for string password and compares it
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.local.password)
}



var User = mongoose.model('User', userSchema)

module.exports = User
