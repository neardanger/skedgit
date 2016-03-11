var
  express = require('express'),
  userRouter = express.Router(),
  userCtrl = require('../controllers/users.js')


userRouter.get('/:id', userCtrl.profile)


module.exports = userRouter
