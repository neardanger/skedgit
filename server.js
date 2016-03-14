var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  // yelp = require('./api/yelp.js'),
  userRoutes = require('./routes/users.js'),
  bodyParser = require('body-parser'),
  yelpRoutes = require('./routes/yelp.js'),
  scheduleRoutes = require('./routes/schedules.js'),
  path = require('path')

// app config
mongoose.connect('mongodb://localhost/skedgit', function(err){
  if(err) throw err
    console.log('connected to mongo');
})
//middleware
app.use(ejsLayouts)
app.use(express.static(path.join(__dirname, '/public')))
// app.use('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static('/public'))

//routes
app.get('/', function(req,res){
  res.sendFile(__dirname, '/index.html')
})
app.use('/users', userRoutes)
app.use('/yelp', yelpRoutes)
app.use('/schedules', scheduleRoutes)


app.listen(3000, function(){
  console.log("Listening to port 3000");
})
