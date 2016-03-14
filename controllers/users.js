var
  User = require('../models/User.js')
  passport = require('passport')

module.exports = {
  profile: function(req,res){
    User.find({_id: req.params.id}, function(err,user){
      if(err) throw err
      res.render('/users/profile', user)
    })
  },

facebookEmail: passport.authenticate('facebook',{
     scope: ['email']
   }),

faceBookLogin:
   passport.authenticate('facebook',{
     successRedirect: '/',
     failureRedirect: '/'
   })


 }
