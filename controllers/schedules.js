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
    Schedule.create(req.body, function(err, schedule){
      if(err) throw err
      res.json(schedule)
    })
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
  }

}
