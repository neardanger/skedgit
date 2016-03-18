var
  express = require('express'),
  userRouter = express.Router(),
  passport = require('passport'),
  userCtrl = require('../controllers/users.js'),
  User = require('../models/User.js'),
  Schedule = require("../models/Schedule.js")


  userRouter.get('/profile', isLoggedIn, function(req, res) {
    console.log("RENDERED PROFILE")
    User.findOne({_id: req.user._id})
        .populate('schedules')
        .exec(function(err, user){
              res.render('profile.ejs', {
                  user : user // get the user out of session and pass to template
              });
            })
    // res.render('profile.ejs', {
    //               user : req.user // get the user out of session and pass to template
    //           })
    //       })

  userRouter.post('/profile', isLoggedIn, function(req, res){
    var newSchedule = new Schedule(req.body)
    console.log("req.user");
    console.log(req.user)
    User.findOne({_id: req.user._id}, function(err, user){
      newSchedule.user = user
      newSchedule.save(function(err, schedule){
        if (err) console.log(err)
        user.schedules.push(schedule)
        user.save(function(err, user){
          res.json({success:true, schedule})
        })
      })
    })
  })

  // userRouter.post('/:id/schedules', function(req,))

// user Profile
  userRouter.get('/:id', userCtrl.profile)
// user oauth
  userRouter.get('/auth/facebook', userCtrl.facebookEmail)

  userRouter.get('/auth/facebook/callback', userCtrl.faceBookLogin)

  userRouter.get('/logout',userCtrl.faceBookLogout)


  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }



  module.exports = userRouter
