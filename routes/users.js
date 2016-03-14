var
  express = require('express'),
  userRouter = express.Router(),
  passport = require('passport'),
  userCtrl = require('../controllers/users.js')


  userRouter.get('/:id', userCtrl.profile)

  userRouter.get('/auth/facebook', userCtrl.facebookEmail)

  userRouter.get('/auth/facebook/callback', userCtrl.faceBookLogin)





  module.exports = userRouter
