var
  express = require('express'),
  userRouter = express.Router(),
  passport = require('passport'),
  userCtrl = require('../controllers/users.js')

// user Profile
  userRouter.get('/:id', userCtrl.profile)
// user oauth
  userRouter.get('/auth/facebook', userCtrl.facebookEmail)

  userRouter.get('/auth/facebook/callback', userCtrl.faceBookLogin)

  userRouter.get('/logout',userCtrl.faceBookLogout)





  module.exports = userRouter
