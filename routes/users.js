var
  express = require('express'),
  userRouter = express.Router(),
  passport = require('passport'),
  userCtrl = require('../controllers/users.js')


  userRouter.get('/profile', isLoggedIn, function(req, res) {
          res.render('profile.ejs', {
              user : req.user // get the user out of session and pass to template
          });
      })

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
