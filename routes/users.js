var
  express = require('express'),
  userRouter = express.Router(),
  passport = require('passport'),
  userCtrl = require('../controllers/users.js'),
  User = require('../models/User.js'),
  Schedule = require("../models/Schedule.js")

// This is supposed to be able to render the new login page/signup
userRouter.route('/login')
  .get(function(req,res){
    res.render('login',{message: req.flash('loginMessage')})
  })
  .post(passport.authenticate('local-login',{
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  //How to signup
  userRouter.route('/signup')
    .get(function(req,res){
      res.render('signup', {message: req.flash('signupMessage')})
    })
    .post(passport.authenticate('local-signup',{
      successRedirect: '/',
      failureRedirect: '/signup'
    }))

    //optional route for profile (good because we get to view our schedule this way)
    //But it looks like we already have it


//Route for updating profile #1
userRouter.get('/update',isLoggedIn,function(req,res){
  res.render('update',{user: req.user})
})

//Route for patching user, this actually patches the user and changes their info.
userRouter.patch('/profile/:id',function(req,res){
  console.log(req.body)
  User.findOneAndUpdate({_id: req.params.id}, req.body,{new:true}, function(err,user){
    if(err) console.log(err)
    res.json({success:"You did it you changed yourself!",user: user})
    console.log(user)
  })
})

//route for deleting a profile
userRouter.delete('/profile/:id', function(req,res){
  User.findOneAndRemove({_id: req.params.id}, function(err){
    if(err){
      console.log(err)
      res.json({success:false, message:"Your account wasn't deleted"})
    }else{
      res.json({success:"", message: "Your account was deleted"})
    }
  })
})

//This is how you check if a local user is logged in

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  res.render('login',{message: "You have to login to view your profile"})
}

//Route for logging out
userRouter.get('/logout', function(req,res){
  req.logout()
  res.redirect('/')
})

  userRouter.get('/profile', isLoggedIn, function(req, res) {
    console.log("RENDERED PROFILE")
    User.findOne({_id: req.user._id})
        .populate('schedules')
        .exec(function(err, user){
              res.render('profile.ejs', {
                  user : user // get the user out of session and pass to template
              });
            })
          })

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



// user Profile
  userRouter.get('/:id', userCtrl.profile)

// facebook user oauth
  userRouter.get('/auth/facebook', userCtrl.facebookEmail)

  userRouter.get('/auth/facebook/callback', userCtrl.faceBookLogin)

  userRouter.get('/logout',userCtrl.faceBookLogout)

// twitter user oauth

  userRouter.get('/auth/twitter', userCtrl.twitterEmail)

  userRouter.get('/auth/twitter/callback',userCtrl.twitterLogin)

  userRouter.get('/logout',userCtrl.twitterLogout)

  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }



  module.exports = userRouter
