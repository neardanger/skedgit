var
  express = require('express'),
  schedulesRouter = express.Router(),
  schedulesCtrl = require('../controllers/schedules.js')

// show the single schedule page
schedulesRouter.get("/:id", schedulesCtrl.show)
// create the schedule
schedulesRouter.post('/', schedulesCtrl.post)
// update a schedule
schedulesRouter.patch('/:id', schedulesCtrl.update)
// delete a schedule
schedulesRouter.delete('/:id', schedulesCtrl.delete)

module.exports = schedulesRouter
