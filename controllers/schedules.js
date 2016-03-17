var
  Schedule = require('../models/Schedule.js')

module.exports = {
  show: function(req,res){
    Schedule.find({_id: req.params.id}, function(err,schedule){
      if(err) throw err
      res.json(schedule)
    })
  },
  post: function(req,res){
    console.log(req.user )
    Schedule.create(req.body, function(err, schedule){
    if (err) console.log(err)
      if(err) throw err
      res.json(schedule)
    })
//goal
    // var newSchedule = Schedule.new(req.body)
    // newSchedule.user = req.user
    // newSchedule.save(function(err, schedule){
    // if (err) console.log(err)
    //   if(err) throw err
    //   res.json(schedule)
    // })
  },
  update: function(req,res){
    Schedule.findOneAndUpdate({_id: req.params.id},req.body, function(err, schedule){
      if(err) throw err
      res.json(schedule)
    })
  },
  delete: function(req,res){
    Schedule.findOneAndRemove({_id: req.params.id}, function(err, schedule){
      if(err) throw err
      res.json(schedule)
    })
  },
  index: function(req,res){
    Schedule.find({}, function(err, schedules){
      res.json(schedules)
    })
  }

}
