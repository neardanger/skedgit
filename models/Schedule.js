var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
  yelpId: String
})

var scheduleSchema = new mongoose.Schema({
  name: {type: String, required: true},
  businesses: [businessSchema]
})

var Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule
