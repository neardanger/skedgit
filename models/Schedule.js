var mongoose = require('mongoose')

var businessSchema = new mongoose.Schema({
  id: String,
  name: String,
  image_url: String,
  rating_img_url_small: String,
  snippet_text: String,
  display_address: String,
  category: String,
  times: {
    start: String,
    end: String
  }
})

var scheduleSchema = new mongoose.Schema({
  user:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  name: {type: String, required: true},
  businesses: [businessSchema]

})

var Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule
