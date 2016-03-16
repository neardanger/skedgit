var
  User = require('../models/User.js')
  passport = require('passport')

module.exports = {



  profile: function(req,res){
    User.find({_id: req.params.id}, function(err,user){
      if(err) console.log(err)
      console.log(user)
      res.render('profile', {user:{
        id: user.facebook,
        token: user.facebook,
        name: user.facebook,
        email: user.facebook
      }})
    })
  },

facebookEmail: passport.authenticate('facebook',{
     scope: ['email']
   }),

faceBookLogin:
   passport.authenticate('facebook',{
     successRedirect: '/',
     failureRedirect: '/'
   }),

faceBookLogout: function(req,res){
  req.logout()
  res.redirect('/')

  },

  checkLogin: function loggedIn(req,res,next){
    if (req.isAuthenticated())
    return next()

    res.redirect('/')
  }

}
