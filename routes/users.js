var
  express = require('express'),
  userRouter = express.Router(),
  userCtrl = require('../controller/user.js')


userRouter.get('/:id', userCtrl.profile)


module.exports = userRouter
